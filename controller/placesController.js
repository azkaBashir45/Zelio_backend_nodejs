
const PlacesModel=require('./../model/places')
//create places for Admin

const CreatePlaces= async (req,res,next)=>{
  try{
    const Places=await PlacesModel.create(req.body)
    res.status(201).json(Places)
    }
    catch(err){
      res.send({meassage:err})
    }

}
//get All places Detail

const getAllPlaces= async (req,res)=>{
  try{
    const places=await PlacesModel.find()
     res.json({
       success:true,
       places
     })
    }
     catch(err)
     {
       res.json({
         message:error
       })
  }
}

//update places for admin
const updatePlaces=async (req,res,next)=>{
   
  try
  {
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
  
  catch(err){
    res.json({
      message:err
    })
  }
}

//delete places----admin
const deletePlaces=async (req,res)=>{
try
{
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
catch(err){
  res.json({
    message:err
  })
}
}

//get one places
 
const getSinglePlaces=async (req,res)=>{
  try
  {
    let placesFind=await PlacesModel.findById(req.params.id)
    if(!placesFind)
    {
      return res.status(500).json({
        success:false,
        message:"Places not found"
      })
    }
    else
    {
      return res.status(200).json({
        success:true,
        placesFind
      })
    }
  }
  catch(err){
    res.json({
      message:err
    })
  }
}

module.exports={
  CreatePlaces,
  getAllPlaces,
  updatePlaces,
  deletePlaces,
  getSinglePlaces
}

