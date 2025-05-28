const Transaction = require("../models/Transaction");

exports.getAll = async (req, res) => {
  const transacoes = await Transaction.find({ userId: req.userId }).sort({ data: -1 });
  res.json(transacoes);
};

exports.create = async (req, res) => {
  const { tipo, valor, categoria, descricao, data } = req.body;
  const transacao = await Transaction.create({
    userId: req.userId,
    tipo,
    valor,
    categoria,
    descricao,
    data,
  });
  res.status(201).json(transacao);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { tipo, valor, categoria, descricao, data } = req.body;
  const transacao = await Transaction.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { tipo, valor, categoria, descricao, data },
    { new: true }
  );
  if (!transacao) return res.status(404).json({ message: "Transação não encontrada" });
  res.json(transacao);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const transacao = await Transaction.findOneAndDelete({ _id: id, userId: req.userId });
  if (!transacao) return res.status(404).json({ message: "Transação não encontrada" });
  res.json({ message: "Transação removida" });
};
