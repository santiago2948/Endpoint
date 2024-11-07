const jwt = require("jsonwebtoken");

exports.verifyToken= (req, res, next)=>{
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined"){
        let token = bearerHeader.split(" ")[1];
        req.token = token;
        next()
    }else{
        res.sendStatus(403).json({
            status: 403,
            error: "No token provided"
        }); //403: ruta o acceso prohibido
    }
}


exports.authorization = (rolNeeded, token, cb)=>{
    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) {
            cb({status: false});
            return;
        }else if(rolNeeded!== userInfo.user.rol) {
            cb({status: false});
            return;
        }
        cb({status: `post fue creado por un ${rolNeeded}`, authData: userInfo});

    });   
}