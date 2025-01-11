const User = require("../model/User");
const { signInValidator } = require("../utils/validation");

const signinMiddleware = async (req,res,next)=>{
    const email  = req.body.email;
    const password = req.body.password;

    const isValidInput = signInValidator({email,password});
    if(!isValidInput.success){
        return res.status(411).json({error:isValidInput.error.issues.map(issue => issue.message).join(" and ")});
    }

    const userExists = await User.findOne({email:email});
    if(!userExists){
        return res.status(404).json({error:"user with this email is not found!"})
    }
    req.user = userExists;
    next();
}

module.exports = signinMiddleware;
