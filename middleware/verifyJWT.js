const jwt = require('jsonwebtoken');
const verify = require('jsonwebtoken/verify');

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded)=>{
            if(err) return res.status(403).send('Forbidden');
            req.user = decoded.Userinfo.Username
            next();
        }
    )
}

module.exports = verifyJWT;