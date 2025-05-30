const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function validateToken (req,res,next) {
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(400).json({
            success : false,
            message : "Authentication required"
        });
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        console.log("accessing protected routes without authentication");
        return res.status(403).json({
            success : false,
            message : "Authenticated users allowed only"
        })
    };

    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
        if(err){
            return res.status(409).json({
                success : false,
                message : "Invalid token"
            })
        }

        req.user = user;
        next();
    })
    
}


module.exports = {validateToken} 
