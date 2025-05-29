const User = require('../models/User');
const bcrypt = require('bcrypt');
const {signToken} = require('../utils/generateToken')

const signupUser = async (req,res) => {
    try {
        console.log("Entering signup controller");
        const {email,password,name} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Please enter email or password"
            })
        }

        const checkOne = await User.findOne({
            email : email,
        })

        if(checkOne){
            return res.status(409).json({
                success : false,
                message : "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUserData = {
            email,
            password : hashedPassword
        }

        if(name){
            newUserData.name = name
        }

        const newUser = new User(newUserData)

        await newUser.save();


        return res.status(201).json({
            success : true,
            message : "User registered successfully",
            user : newUser,
        })
        

    } catch (error) {
        console.log(`Error occurred in signup controller: ${error}`);
        return res.status(500).json({
            success : false,
            message : "Internal server error" 
        })
    }
}


const loginUser = async (req,res) => {
    try {

        const {email,password} = req.body;

        const checkUser = await User.findOne({email : email});

        if(!checkUser){
            return res.status(400).json({
                success : false,
                message : "The user does not exist"
            })
        }

        const hashedPassword = checkUser.password;

        const compare = await bcrypt.compare(password,hashedPassword);

        if(!compare){
            return res.status(400).json({
                success : false,
                message : "Invalid credentials"
            })
        }

        const token = await signToken(checkUser);

        return res.status(200).json({
            success : true,
            message : "User logged in successfully",
            checkUser,
            token
        })

    } catch (error) {
        console.log(`Error occurred in login controller ${error}`);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}




module.exports = {signupUser,loginUser}