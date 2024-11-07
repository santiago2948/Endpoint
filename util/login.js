const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.login = (email, password, callback) => {
    fs.readFile("users.json", "utf8", (error, data)=>{
        if(error) {
            console.log("error al leer el archivo")
            callback(error, {result: false});
        }else{
            const jsonData= JSON.parse(data)
            let user=jsonData.find(e =>e.email===email && e.password===password);
            if(user){
                user= jwt.sign({user: {email: user.email, rol: user.rol, name: user.name}}, "secretkey", {expiresIn: "20d"}, callback)
            }else{
                callback("email o contraseña invalidos", {result: false});
            }
        }
    })
}