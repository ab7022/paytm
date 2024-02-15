const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization 
    if(!authHeader){
        return res.status(403).json({
            msg:"Token Not Found"
        });

    }
    const token = authHeader;
    console.log(token);
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        req.userId = decoded.userId.toString(); 
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            msg:"Something Went Wrong"
        });

    }
    next()
}


module.exports = {
    authMiddleware
}