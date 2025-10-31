const dotenv = require("dotenv");
dotenv.config(); // ✅ Load environment variables first!
const cookieParser = require("cookie-parser");

const app = require("./app");
const { connectDB } = require("./db/db");
const http = require("http");

const server = http.createServer(app);

// ✅ Connect to DB after env vars are loaded
connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
