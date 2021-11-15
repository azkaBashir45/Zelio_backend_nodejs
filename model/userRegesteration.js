const mongoose=require("mongoose");
const validator=require("validator")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
   name:{
      type:String,
      required:[true,"please enter your name"],
      maxlength:[30,"Name cannot exceed 30 character"],
      minlength:[3,"Name should have more than 3 character"]
   },
   email:{
     type:String,
     required:[true,"please enter your email"],
     unique:true,
     validate:[validator.isEmail,"Please enter a valid email"]
   },

   password:{
    type:String,
    required:[true,"Please enter your"],
    minlength:[8,"Password should be greater than 8 character"],
    select:false
   },
   avatar:{
      public_id:{
         type:String,
         required:true,
     },
     url:{
        type:String,
        required:true
     }
   },
   role:{
      type:String,
      default:"user"
   },
   resetPasswordToken:String,
   resetPasswordExpire:Date,
 
});
//pasword encrypt
//basic function use because arrow function not accept this
userSchema.pre("save",async function(next){
   //if password already hash then next
   if(!this.isModified("password")){
      next()
   }
   this.password=await bcryptjs.hash(this.password,10)
});

//jwt token
userSchema.methods.getjwtToken=function(){
   return jwt.sign({id:this._id},process.env.Jwt_SECRET,{
      expiresIn:process.env.JWT_Expire
   })
}

//compare password
userSchema.methods.comparePassword=async function(enterdPassword){
 return await bcryptjs.compare(enterdPassword,this.password);
}
module.exports=mongoose.model("auth",userSchema,'auth');