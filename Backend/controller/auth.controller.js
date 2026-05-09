import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Login Route
export const login=async(req,res)=>{
try{
  const{email,password}=req.body;
  const user=await User.findOne({email});
  if(!user){
    return res.status(404).json({message:"User not found"});
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(400).json({message:"Invalid credentials"});
  }
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
  res.json({token});
}
catch(err){
  console.log(err);
}
}


//SignupRoute
export const signup=async(req,res)=>{
try{
  const {name,email,password}=req.body;
  if (!name || !email || !password) {
  return res.status(400).json({
    message: "All fields are required"
  });
}
  const existingUser=await User.findOne({email});
  if(existingUser){
    return res.status(400).json({message:"User already exists"});
  }
  const hashedPassword=await bcrypt.hash(password,12);
  const user=await User.create({
    name,
    email,
    password:hashedPassword
  });
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
  res.status(201).json({token});
}
catch(err){
  console.log(err);
}
}

//Get Profile Route
export const getprofile=async(req,res)=>{
try{
  const user=await User.findById(req.user.id).select("-password");
  if(!user){
    return res.status(404).json({message:"User not found"});
  }
  res.json(user);
}
catch(err){
  console.log(err);
}
}