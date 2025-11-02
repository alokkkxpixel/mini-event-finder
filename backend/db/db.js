const mongoose = require("mongoose");

 async function connectDB() {
   try {
     await mongoose.connect(process.env.MONOGO_ATLAS_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     console.log("✅ MongoDB Atlas Connected...");
   } catch (err) {
     console.error("❌ Connection error:", err.message);
     process.exit(1);
   }
 }

module.exports = {connectDB};