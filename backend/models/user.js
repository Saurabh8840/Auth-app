const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
       
        trim: true,
        lowercase: true,
        minLength: 3,
         unique: true,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50
    }
});


const User=mongoose.model('User',userSchema);

module.exports={
    User,

};

