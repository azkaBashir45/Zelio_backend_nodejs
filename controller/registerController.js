const Register = require("./../model/userRegesteration");
const Otp = require("./../model/otp");
const catchAsyncError = require("./../middleware/catchAsyncError")


//jwt
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
//post data
const Post_Register = catchAsyncError(async (req, res,next) => {
    const { name, email, password } = req.body
    const result = await Register.findOne({ email: email });
    if (result) {
        res.send({ message: 'email aleady exist' })
    }
    else {
        const user =await Register.create({
            name, email, password,
            avatar: {
                public_id: "this th profile",
                url: "profilepicture"
            } });

            sendToken(user,201,res);
        }
    

}  //login
 )
      const loginData =catchAsyncError (async (req, res,next) => {
        const { email, password } = req.body
        //checking email and password both 
        if(!email||!password){
            return next(new ErrorHandler("Please enter email & password",400));
        }

            const user = await Register.findOne({
                email: email
            }).select("+password");

          if(!user)
          {
             return next(new ErrorHandler("Invalid email or password12",401));
          }
          const isPasswordChecked=user.comparePassword(password)
        if(!isPasswordChecked)
        {
            return next(new ErrorHandler("Invalid email or password",401));
        }
       
           
      sendToken(user,200,res);
      }
      )
    //Reset Password......
    //email send
    const emailSend = async (req, res) => {
        //send email before validate email
        console.log(req.body.email)
        const data = await Register.findOne({ email: req.body.email })
        // console.log(data)
        //response
        const responseType = {}

        if (data) {
            const OtpCode = Math.floor((Math.random() * 10000) + 1);
            const otpData = new Otp({
                email: req.body.email,
                code: OtpCode,
                expiresIn: new Date().getTime() + 300 * 1000
            })
            let otpResponse = await otpData.save();
            responseType.statusText = 'Successs'
            // mailer()
            responseType.message = 'please check your email id'

        }
        else {
            responseType.statusText = 'Error'
            responseType.message = 'Email i is not exist'

        }


        res.status(200).json(responseType)
    }


    //reset Pssword
    const changePassword = async (req, res) => {
        let data = await Otp.find({ email: req.body.email, code: req.body.code });
        const responseType = {}
        if (data) {
            let currentTime = new Date().getTime();
            let diff = data.expiresIn - currentTime;
            if (diff < 0) {
                responseType.message = 'Token Expire',
                    responseType.statusText = 'error'
            }
            else {
                let user = await Register.findOne({ email: req.body.email })
                user.password = req.body.password;
                user.save()
                responseType.message = 'change Password Successfully',
                    responseType.statusText = 'success'
            }
        }
        else {
            responseType.message = 'Invalid',
                responseType.statusText = 'error'
        }
        res.status(200).json(responseType)
    }

    //mailer
    const mailer = (email, otp) => {
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: 'azka.ngxfot@gmail.com',
                pass: "Azka1279945"
            }
        });
        var mailOptions = {
            from: "azka.ngxfot@gmail.com",
            subject: "sending",
            text: "thank you sir"
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('errror', error)
            }
            else {
                console.log('email sent', +info.response);
            }
        })


    }


    const logOut =catchAsyncError(async(req, res,next) => {
        // res.cookie("token",null,{
        //     expires:new Date(Date.now),
        //     httpOnly:true
        // })
        // res.status(200).json({
        //     status: 'logout successfully'
        // });
    }
    )
    //const 
    const getData = async (req, res) => {
        const data = await Register.find();
        res.json(data);
    }

    module.exports = {
        Post_Register,
        loginData,
        emailSend,
        changePassword,
        logOut, getData
    }