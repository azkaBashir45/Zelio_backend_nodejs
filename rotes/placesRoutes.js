const router=require('express').Router();
const { isAuthenticatedUser } = require('../middleware/authentication');
const placesController=require('./../controller/placesController')

router.route('/places/new').post(placesController.CreatePlaces);
router.route('/places').get(isAuthenticatedUser,placesController.getAllPlaces);
router.route('/places/:id').put(placesController.updatePlaces).delete(placesController.deletePlaces).get(placesController.getSinglePlaces);
module.exports=router;