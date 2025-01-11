const bcrypt = require("bcrypt")
const {SALT_ROUNDS,JWT_SECRET} = require("../config/dotenv");
const User = require("../model/User");
const jwt = require("jsonwebtoken")


const createUser = async({firstName,lastName,email,password})=>{
    try{
        const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);
        await User.create({firstName,lastName,email,password:hashedPassword});
        return {
            "success":true,
            "error":"user registration successfull!"
        };
    }
    catch(error){
        return {
            "success":false,
            "error":"user registration failed!"+ error
        };
    }
}

const validate = async(user,password) =>{
    try {
        const userId = user._id;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const email = user.email;
        const storedPassword = user.password;
        const isValidCredentials = await bcrypt.compare(password,storedPassword)
        if(!isValidCredentials){
            return {
                "success":false,
                "error":"invalid credentials!"
            }
        }

        const token = 'Bearer ' + jwt.sign({userId,firstName,lastName,email},JWT_SECRET)
        return {
            "success":true,
            "token":token
        }

    } catch (error) {
        return {
            "success":true,
            "error":"user authentication failed!"+error
        }
    }

}


const verifyToken = (token) =>{
    const response =  jwt.verify(token,JWT_SECRET);
    return response;
}


module.exports = {
    createUser,
    validate,
    verifyToken
}
