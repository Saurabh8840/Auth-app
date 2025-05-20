const express = require("express");
const cors=require("cors");
require("dotenv").config();


require("./db");
//import user  model
const { User } = require("./models/user.js");
//require bcryptjs
const bcrypt=require("bcryptjs");


const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup",async function (req, res) {

    const {username,password,firstName,lastName}=req.body;

    try{
        //check if user already exist or not
        const existingUser= await User.findOne({username});

        if(existingUser){
            return res.status(400).json({message:"username already taken"});

        }

        //hashpassword
        const hashedPassword=await bcrypt.hash(password,10);


        //create new user
        const newUser=new User({
            username,
            password:hashedPassword,
            firstName,
            lastName
        });

        //save to db

        await newUser.save();

        //send response
        res.status(201).json({message:"Signup successfull"});
    }catch(err){
        console.error("signup error:",err);
        res.status(500).json({message:"internal server error"});

    }
});

app.post("/signin", function (req, res) {});

app.listen(3000, () => {
  console.log("engine started");
});
