import jwt from "jsonwebtoken"
export const authMiddleware=async(req,res,next)=>{
  try{
     const token = req.header("Authorization");
     if(!token){
      return res.status(401).json({message:"No token, authorization denied"});
     }
     const actualToken = token.split(" ")[1];

    const decoded = jwt.verify(
      actualToken,
      process.env.JWT_SECRET
    );
    //decoded= {id:user.id,iat:timestamp,exp:timestamp}
    //idr se hme payload mil jayega

    req.user = decoded;
    //ab req.user me hmara payload aa jayega jisme id hoga,ab hm is req.user se user ki details nikal sakte hai-> req.user.id 

    next();
  }
  catch(err){
return res.status(401).json({
      message: "Invalid token"
    });
  }
}