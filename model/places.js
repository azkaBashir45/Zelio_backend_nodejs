const mongoose=require('mongoose')
const placesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter places the name"],
    },
    description:{
        type:String,
        required:[true,"Please enter the places description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the places price"],
        maxlength:[8,"Price cannot exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                    type:String,
                    required:true,
                },
                url:{
                   type:String,
                   required:true
                }
            
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter the places category"] 
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model("Placess",placesSchema,"Placess")