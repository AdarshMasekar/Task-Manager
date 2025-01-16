const {verifyToken} = require("../controller/userController")


const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({error:"no token provided!"})
    }
    const isValidToken = verifyToken(token);
    req.user = isValidToken;
    if(!isValidToken){
        return res.status(401).json({error:"invalid token"})
    }
    next();
}

module.exports = authMiddleware;
