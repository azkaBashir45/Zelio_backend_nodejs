const router=require('express').Router();
const placesController=require('./../controller/placesController')

router.route('/places/new').post(placesController.CreatePlaces);
router.route('/places').get(placesController.getAllPlaces);
router.route('/places/:id').put(placesController.updatePlaces).delete(placesController.deletePlaces).get(placesController.getSinglePlaces);
module.exports=router;