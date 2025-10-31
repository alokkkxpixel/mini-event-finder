const mongoose = require("mongoose")

const userSchema  = new mongoose.Schema({
  
    fullname:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        // unique:true
    },
    password:{
        type:String,
        requried:true
    }

})

const UserModel = mongoose.model("user",userSchema)

module.exports = UserModel