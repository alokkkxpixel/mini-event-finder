
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../model/user.model")
module.exports.userCreate = async (fullname, email , password) => {

    if(!fullname || !email || !password){
        throw new Error("All fields are required")
    }

    const hasshedPassword = await bcrypt.hash(password,10)

    const User = await UserModel.create({
        fullname,
        email,
        password:hasshedPassword,
    }) 
  console.log("user service" , User)
  



    return User
    
}