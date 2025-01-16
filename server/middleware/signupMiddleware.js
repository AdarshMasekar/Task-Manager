const User = require("../model/User")
const {userValidator} = require("../utils/validation")

const signupMiddleware = async(req,res,next)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const isValidInput = userValidator({firstName,lastName,email,password});
    if(!isValidInput.success){
        const error = new Error("Invalid input");
        error.statusCode = 411;
        error.message = isValidInput.error.issues.map(issue => issue.message);
        return next(error);
    }

    const userExists = await User.findOne({email:email});
    if(userExists){
        const error = new Error("User already exists");
        error.statusCode = 400;
        error.message = "user with email already exists! Please try to log in.";
        return next(error);
    }

    next();
}

module.exports = signupMiddleware;
