const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require("jsonwebtoken")
const User=require("./../model/userRegesteration")
exports.isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{
    //login time pr jo hmny token save kiyya tha cookie
    const token=req.headers.cookie.
    console.log(token)
    const finalToken=token.slice(6)
//    console.log(finalToken ) 
if(!token){
    // return res.status(401).json({fff
    //     success:false,
    //     message:"Product not found"
    // })
    next(new ErrorHandler("Please login to access this resources",401))
}
const decodedata=jwt.verify(finalToken,process.env.Jwt_SECRET);
req.user=await User.findById(decodedata.id)
next()
}

)