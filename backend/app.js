const express = require("express")
const cors = require("cors");
const userRoute  = require("./routes/user.route")

const eventRoute = require("./routes/event.route")
const cookieParser = require("cookie-parser")
const app = express();
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:5173", "https://myfrontend.vercel.app"], // or your frontend URL
    credentials: true, // ✅ allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("HELOOW")
})

app.use("/api/auth",userRoute)
app.use("/api/event",eventRoute)

module.exports = app