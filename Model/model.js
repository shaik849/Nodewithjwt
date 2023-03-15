const mongoose = require('mongoose')
const {isEmail} = require('validator');
const bcrypt = require('bcrypt')

const {Schema} = mongoose;

const userSchema = new Schema({
    email : {
        type : String,
        unique : true,
        required : [true, "email Required"],
        validate : [isEmail, "Please enter valid email"]
    },
    password : {
        type : String,
        required : [true, "password Required"],
        minlength : [6, "password must be at least 6 characters"]
    },
    token: {
        type : String
    }
})


userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt) 
  next();
})



const login = mongoose.model("login", userSchema)

module.exports = login;