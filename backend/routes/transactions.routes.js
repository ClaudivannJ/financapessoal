const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const Transaction = require('../models/Transaction');

// Todas as rotas abaixo exigem token
router.use(verifyToken);

// Listar
router.get('/', async (req, res) => {
  const data = await Transaction.find({ userId: req.userId });
  res.json(data);
});

// Criar
router.post('/', async (req, res) => {
  const tx = new Transaction({ ...req.body, userId: req.userId });
  await tx.save();
  res.status(201).json(tx);
});

// Editar
router.put('/:id', async (req, res) => {
  const tx = await Transaction.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(tx);
});

// Excluir
router.delete('/:id', async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id, userId: req.userId });
  res.json({ mensagem: 'Removido com sucesso' });
});

module.exports = router;