const {verifyToken} = require("../controller/userController")


const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization;
    const acutalToken = token.split(" ")[1];

    const isValidToken = verifyToken(acutalToken);
    req.user = isValidToken;
    if(!isValidToken){
        return res.status(401).json({error:"invalid token"})
    }
    next();
}

module.exports = authMiddleware;
