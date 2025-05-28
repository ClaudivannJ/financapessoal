const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./services/db");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", require("./routes/auth.routes"));
app.use("/transactions", require("./routes/transaction.routes"));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Servidor rodando na porta ${PORT}`);
});
