const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")

const {login} = require("./util/login");
const postRoutes = require("./routes/posts");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/login", (req, res)=>{
    const {email, password} = req.body;
    console.log(email);
    login(email, password,  (err, token)=>{
            if(err){
                console.log(err);
                res.sendStatus(403);
            }else{
                res.json({token: token})
            }
        });
    })

app.use("/posts", postRoutes)

app.listen(80, ()=>{
    console.log("escuchando en el puerto 80")
})