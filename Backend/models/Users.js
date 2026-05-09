import mongoose from "mongoose";
const User=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
       type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    dietPreference: {
      type: String,
      enum: ["veg", "non-veg", "vegan", "jain"],
      default: "veg"
    },
    allergies: [
      {
        type: String
      }
    ],
    location: {
      city: String,
      state: String,
      country: String
    }


})
export default mongoose.model("User",User);