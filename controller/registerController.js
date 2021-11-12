const Register = require("./../model/userRegesteration");
const Otp = require("./../model/otp")


//jwt
const jwt = require("jsonwebtoken");
const jwtKey = "jwt"
//post data
const Post_Register =  async (req, res) => {
    // const { name,  email, password } = req.body

    try {

      const result =await Register.findOne({email: email});
          if(result)
          {
              res.send({message:'email aleady exist'})
          }
          else
          {
            const register = new Register({
                            name:req.body.name,
                            email:req.body.email,
                            password:req.body.password,
        
                        });
                        const registerSave =  register.save();
                        //token generate
                        jwt.sign({ registerSave }, jwtKey, { expiresIn: '300s' }, (err, token) => {
                            if (err) {
                                res.send({ message: err ,mjj:"kiuo"})
                            }
                            else {
        
                                res.send({ message: "Register successfully", token })
                            }
                        })
                    }
    }

    catch (error) {
        res.send(error);

    }
}

//login
const loginData = async (req, res) => {
    const {email,password}=req.body
    try {
        const loginResult = await Register.findOne({
            email:email
        });
        if(loginResult)
        {
            if(password===loginResult.password)
            {
                jwt.sign({ loginResult }, jwtKey, { expiresIn: '300s' }, (err, token) => {
                    if(err)
                    {
                        res.send({message:"Login Failed"})
                    }
                    else
                    {
                        res.json({message:"Login Successfully", token })
                    }
                   
                })
            }
            else{
                res.send({message:"Password didn't match"})
            }
        }
      
    }
    catch (error) {
        res.send(error);

    }
}


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


const logOut = (req, res) => {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
}

//const 
const getData= async (req,res)=>{
     const data=await Register.find();
     res.json(data);
}

module.exports = {
    Post_Register,
    loginData,
    emailSend,
    changePassword,
    logOut,getData
}