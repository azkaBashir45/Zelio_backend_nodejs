
const PlacesModel=require('./../model/places')
const catchAsyncError=require("./../middleware/catchAsyncError")
const ErrorHandler = require('../utils/ErrorHandler')
//create places for Admin

const CreatePlaces=catchAsyncError( async (req,res,next)=>{
 
    const Places=await PlacesModel.create(req.body)
    res.status(201).json(Places)
    }
)
//get All places Detail

const getAllPlaces=catchAsyncError( async (req,res)=>{
  
    const places=await PlacesModel.find()
     res.json({
       success:true,
       places
     })
   
}
)
//update places for admin
const updatePlaces=catchAsyncError( async (req,res,next)=>{
   
 
    let placesFind=await PlacesModel.findById(req.params.id)
    if(!placesFind)
    {
      return res.status(500).json({
        success:false,
        message:"Places not found"
      })
    }
    
       placesFind=await PlacesModel.findByIdAndUpdate(req.params.id,req.body
      );
      res.status(200).json({
        success:true,
       placesFind
      })
    
}
)

//delete places----admin
const deletePlaces=catchAsyncError( async (req,res)=>{

  let placesFind=await PlacesModel.findById(req.params.id)
    if(!placesFind)
    {
      return res.status(500).json({
        success:false,
        message:"Places not found"
      })
    }
    
  const places=await PlacesModel.findByIdAndDelete(req.params.id)
  res.status(200).json({
    success:true,
    places
  })

}
)
//get one places
 
const getSinglePlaces=catchAsyncError( async (req,res,next)=>{
 let placesFind=await PlacesModel.findById(req.params.id)
    if(!placesFind)
    {
      return next(new ErrorHandler("Product not found",404))
    }
    else
    {
      return res.status(200).json({
        success:true,
        placesFind
      })
    }
  
}
)
module.exports={
  CreatePlaces,
  getAllPlaces,
  updatePlaces,
  deletePlaces,
  getSinglePlaces
}

