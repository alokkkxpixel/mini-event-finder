const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { userCreate } = require("../service/user.service");
const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt")
async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    const User = await userCreate(fullname, email, password);

    const token = jwt.sign({ _id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ set cookie with options
    res.cookie("token", token, );

    res.status(201).json({
      message: "User Registered successfully",
     User,token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
}
async function loginUser(req, res) {

  const { email, password } = req.body;
  console.log("token",req.cookies.token)

  try {
    const UserData = await UserModel.findOne({ email });
    if (!UserData) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, UserData.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: UserData._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Set cookie
    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      User: UserData,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
}
async function logoutUser(req, res) {
  try {
    
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
}
module.exports = { registerUser , loginUser, logoutUser};
