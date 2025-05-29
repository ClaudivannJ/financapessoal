const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas conectado com sucesso");
  } catch (error) {
    console.error("❌ Erro na conexão com MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
