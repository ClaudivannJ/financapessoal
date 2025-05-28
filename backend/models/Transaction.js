const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tipo: { type: String, enum: ["receita", "despesa"], required: true },
  valor: { type: Number, required: true },
  categoria: { type: String, required: true },
  descricao: { type: String },
  data: { type: Date, required: true },
  criadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
