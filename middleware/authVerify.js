const jwt = require('jsonwebtoken')

//middleware

const verifyToken = (req, res, next) => {
    const bearearHeader = req.headers['authorization'];
    // console.log(bearearHeader)
    if (typeof bearearHeader !== 'undefined') {
        //bearer ko remove krna chahty bs hmy token view ho to..
        const bearer = bearearHeader.split(' ')
        // console.log(bearer[1])
        //for verify
        req.token = bearer[1];
        jwt.verify(req.token, 'jwt', (err, authData) => {
            if (err) {
                res.send({ message: err })
            }
            else {
                //means jo page render krna chahty h wo hojy
                next()
            }
        })
    }
    else {
        res.send({ message: "Token not provided" })
    }

}
module.exports = verifyToken;

    //isko insie typeof laijty h code ky 


