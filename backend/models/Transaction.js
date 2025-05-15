const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'O ID do usuário é obrigatório'],
    },
    tipo: {
        type: String,
        enum: ['receita', 'despesa'],
        required: [true, 'O tipo da transação é obrigatório'],
    },
    valor: {
        type: Number,
        required: [true, 'O valor da transação é obrigatório'],
        min: [0, 'O valor não pode ser negativo'],
    },
    categoria: {
        type: String,
        required: [true, 'A categoria é obrigatória'],
    },
    descricao: {
        type: String,
    },
    data: {
        type: Date,
        required: [true, 'A data da transação é obrigatória'],
    },
    criadoEm: {
        type: Date,
        default: Date.now,
    },
});

// Índices para consultas rápidas
transactionSchema.index({ userId: 1 }); // Índice para buscas por usuário
transactionSchema.index({ data: -1 }); // Índice para ordenação por data

module.exports = mongoose.model('Transaction', transactionSchema);