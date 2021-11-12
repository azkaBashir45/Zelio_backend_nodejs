const ErrorHanler=require("./../utils/errorHandler")

module.exports=(err,req,res,next)=>{
   err.statusCode=err.statusCode||500
   err.message=err.message ||"Internal Server Error";
   //wrong mongo db id error
   if(err.name==="CastError"){
      const message=`Resource not found .Invalid :${err.path}`;
      err=new ErrorHanler(message,400);
   }
   res.status(err.statusCode).json({
       success:false,
       message:err.message
    //    error:err.stack agr error m location bhi show krwany ho
    
   })
}