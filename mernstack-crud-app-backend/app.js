
const express = require('express');
const mongoose = require('mongoose');
const router = require("./Route/UserRoutes");

const app = express();
const cors = require("cors");


//Middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);

mongoose.connect("mongodb+srv://keshanshavidu:Shavindu2000@shavindu9.1gh7s13.mongodb.net/?retryWrites=true&w=majority&appName=Shavindu9")
.then(()=> console.log("connected_to_Mongodb"))
.then(() => {
    app.listen(5000);
})
.catch((err)=> console.log((err)));

//call register model
require("./Model/Register");
const User = mongoose.model("Register");
app.post("/register",async(req,res)=>{
    const{name,gmail,passwords} = req.body;
    try{
        await User.create({
            name,
            gmail,
            passwords,
        })
        res.send({status:"ok"})
        
    }catch(err){
        res.send({status:"err"});
    }
});

//Login function

app.post("/login" ,async(req,res) =>{
    const {gmail,password} = req.body;
    try{
        const user = await User.findOne({gmail});
        if(!user){
            return res.json({err:"user Not Found"})
        }
        if(user.password === password){
            return res.json({status: "ok"});
        }else{
            return res.json({err: "incorrect Password"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({err:"server Error"})
    }
});
