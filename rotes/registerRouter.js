const registerController=require("../controller/registerController")
const router=require("express").Router();
//middleware
const verifyToken=require("./../middleware/authVerify")
router.post("/register",registerController.Post_Register);
router.post("/login",registerController.loginData);

//random
router.get('/random',verifyToken,registerController.getData)

//for reset password
router.post("/emailSend",registerController.emailSend);
router.post("/changePassword",registerController.changePassword);
router.get("/logOut",registerController.logOut);

module.exports=router;