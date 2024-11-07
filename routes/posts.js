const express = require("express");


const {authorization, verifyToken} = require("../util/proxy")

const router= express.Router();

router.post("/admin", verifyToken, (req, res)=>{
    const rolNeeded="admin"
    authorization(rolNeeded, req.token, (response)=>{
        if(!response.status) {
            res.sendStatus(403).json({
                status: 403,
                error: "Acceso denegado"
            })
            return;
        }
        res.json({status: "post fue creado", authData: response});
    }) 
})

router.post("/reader", verifyToken, (req, res)=>{
    const rolNeeded="reader"
    authorization(rolNeeded, req.token, (response)=>{
        if(!response.status) {
            res.sendStatus(403)
            return;
        }
        res.json({status: "post fue creado", authData: response});
    }) 
})

module.exports=router;