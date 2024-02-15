const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
            msg:"Token Not Found"
        });

    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        req.userId = decoded.userId.toString(); 
    } catch (error) {
        return res.status(403).json({
            msg:"Something Wen Wrong"
        });

    }
    next()
}


module.exports = {
    authMiddleware
}