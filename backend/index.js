const express = require("express");
const cors=require("cors");
require("dotenv").config();

const jwt=require("jsonwebtoken");
require("./db");
//import user  model
const { User } = require("./models/user.js");
//require bcryptjs
const bcrypt=require("bcryptjs");
const { JsonWebTokenError } = require("jsonwebtoken");
const authMiddleware=require('./middleware');
// const { ZeroSlopeEnding } = require("three/src/constants.js");
const {signupSchema,signinSchema}=require('./zodSchema');




const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup",async function (req, res) {
    console.log("signupSchema: ", signupSchema);

    const result=signupSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message:"validation failed",
            errors:result.error.errors
        });
    }



    const {username,password,firstName,lastName}=result.data;

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

        //create token
        const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET);

        res.status(201).json({
            message:"Signup succesfull",
            token
        });

        //send response

    }catch(err){
        console.error("signup error:",err);
        res.status(500).json({message:"internal server error"});

    }
});

app.post("/signin",async function (req, res) {

    const result=signinSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message:"validation failed",
            errors:result.error.errors
        });
    }

    const {username,password}=result.data;

    try{
        const existingUser= await User.findOne({username}).select("username firstName password");

        if(!existingUser){
            return res.status(404).json({message:"user does not exist"})
        }
        
        //correct password

        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect){
            return res.status(401).json({message:"Incorrect password"});

        }

        //generate jwt token

        const token=jwt.sign(
            {
                userId:existingUser._id,
                username:existingUser.username,
                firstName:existingUser.firstName
            },
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.status(200).json({message:"signin successfull",token});

    }catch(err){
        console.log("signin error:",err);
        res.status(500).json({message:"Internal server error"});
    }
});


app.get("/dashboard",authMiddleware,function(req,res){
    res.json({
        firstName:req.user.firstName,
        username:req.user.username,
        message:`Welcome,${req.user.username}!You are authorized.`});
})

app.listen(3000, () => {
  console.log("engine started");
});
