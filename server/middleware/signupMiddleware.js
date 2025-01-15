const User = require("../model/User")
const {userValidator} = require("../utils/validation")

const signupMiddleware = async(req,res,next)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const isValidInput = userValidator({firstName,lastName,email,password});
    if(!isValidInput.success){
        res.status(411).json(isValidInput.error.issues.map(issue => issue.message));
    }

    const userExists = await User.findOne({email:email});
    if(userExists){
        res.status(400).json({error:"user with email already exists! Please try to log in."})
    }

    next();
}

module.exports = signupMiddleware;
