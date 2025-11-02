const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route");
const eventRoute = require("./routes/event.route");

const app = express();

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://eventfinder-omega.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.use("/api/auth", userRoute);
app.use("/api/event", eventRoute);

module.exports = app;
