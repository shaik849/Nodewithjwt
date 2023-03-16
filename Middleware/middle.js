const jwt = require("jsonwebtoken")

const reqAuth = (req, res, next)=> {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=> {
            
            if(err){
                res.status(401).redirect("/some")
            }else{
            //   console.log(decoded)
                next();
            }
        });
    }
    else{
        res.status(401).redirect("/some")
    }
}

module.exports = reqAuth;