const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");

const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ messesage: "Unauthorized" });
  }

  console.log(token)
 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded._id);

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ messesage: "Unauthorized" });
    // return res.status(401).json();
  }
};

module.exports = {
    authUserMiddleware
}