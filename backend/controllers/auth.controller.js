const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "Email já cadastrado" });

    const senhaHash = await bcrypt.hash(senha, 10);
    const user = await User.create({ nome, email, senhaHash });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, nome: user.nome });
  } catch (error) {
    res.status(500).json({ message: "Erro no registro" });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Credenciais inválidas" });

    const senhaValida = await bcrypt.compare(senha, user.senhaHash);
    if (!senhaValida) return res.status(400).json({ message: "Credenciais inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, nome: user.nome });
  } catch (error) {
    res.status(500).json({ message: "Erro no login" });
  }
};
