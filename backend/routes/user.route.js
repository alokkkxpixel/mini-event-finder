const express  = require("express")
const {body} = require("express-validator")
const { registerUser, loginUser, logoutUser, getuser } = require("../controller/user.controller")
const { authUserMiddleware } = require("../middleware/user.middleware")
const router = express.Router()

router.post("/register",
 body("fullname").isString().withMessage("Fullname is Required"),
 body("email").isEmail().withMessage("Valid Email is Required"),
 body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),

registerUser
)
router.post("/login",
     body("email").isEmail().withMessage("Valid Email is Required"),
 body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),

  loginUser
)
router.get("/me",authUserMiddleware, getuser)
router.post("/logout",
    logoutUser
)
module.exports = router