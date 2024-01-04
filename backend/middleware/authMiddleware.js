const jwt=require("jsonwebtoken");
const User=require("../Models/userModel");
const asyncHandler=require("express-async-handler");


const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1];

            //decode 
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select("-password");
            next();
        }
        catch(err){
            res.status(401);
            throw new Error("Not authorized");
        }
    }
});
module.exports={protect};