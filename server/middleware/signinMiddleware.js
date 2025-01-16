const User = require("../model/User");
const { signInValidator } = require("../utils/validation");

const signinMiddleware = async (req,res,next)=>{
    const email  = req.body.email;
    const password = req.body.password;

    const isValidInput = signInValidator({email,password});
    if(!isValidInput.success){
        const error = new Error("Invalid input");
        error.statusCode = 411;
        error.message = isValidInput.error.issues.map(issue => issue.message);
        return next(error);
    }

    const userExists = await User.findOne({email:email});
    if(!userExists){
        const error = new Error("User not found");
        error.statusCode = 404;
        error.message = "user with this email is not found!";
        return next(error);
    }
    req.user = userExists;
    next();
}

module.exports = signinMiddleware;
