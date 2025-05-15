const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  // Verifica duplicidade
  if (await User.findOne({ email })) {
    return res.status(400).json({ erro: 'E-mail já cadastrado' });
  }
  // Criptografa senha
  const senhaHash = await bcrypt.hash(senha, 10);
  // Salva o usuário
  await User.create({ nome, email, senhaHash });
  res.status(201).json({ mensagem: 'Usuário criado' });
});


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });

  // 1. Validar senha
  if (!await bcrypt.compare(senha, user.senhaHash)) {
    return res.status(401).json({ erro: 'Senha incorreta' });
  }
  // 2. Gerar token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '8h'
  });
  res.json({ token, user: { id: user._id, nome: user.nome } });
});

module.exports = router;