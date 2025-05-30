const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

async function signToken (user) {
    const token = jwt.sign({
            userId: user._id.toString(),
            userEmail: user.email
    },process.env.JWT_SECRET,{expiresIn: '1h'});
    
    return token;
}

module.exports = {signToken};