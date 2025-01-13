const {Router} = require("express");
const router = Router();
const User = require("../model/User");
const SALT_ROUNDS = require("../config/dotenv")
const signupMiddleware = require("../middleware/signupMiddleware")
const signinMiddleware = require("../middleware/signinMiddleware")
const {createUser,validate} = require("../controller/userController")


router.post("/signup",signupMiddleware,async(req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = await createUser({firstName,lastName,email,password});
    if(!newUser.success){
        return res.status(400).json({error:"user creation failed!"})
    }
    res.status(201).json({msg:"user registered successfully!"})
})

router.post("/signin",signinMiddleware,async(req,res)=>{
    const password = req.body.password;
    const user = req.user;

    const validateUser = await validate(user,password);
    if(!validateUser.success){
        return validateUser.error;
    }
    const userDetails = {
        userId:req.user._id,
        firstName:req.user.firstName,
        lastName:req.user.lastName
    }
    const token = validateUser.token;
    res.status(200).json({
        token:token,
        userDetails:userDetails
    })
})

router.get("/",async(req,res)=>{
    const users = await User.find();
    res.json({users:users})
})


module.exports = router;
