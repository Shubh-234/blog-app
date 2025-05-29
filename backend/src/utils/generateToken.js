const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

async function signToken (user) {
    const token = jwt.sign({
            userId: user._id,
            userEmail: user.email
    },process.env.JWT_SECRET,{expiresIn: '10m'});
    
    return token;
}

module.exports = {signToken};