const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório'],
    },
    email: {
        type: String,
        required: [true, 'O e-mail é obrigatório'],
        unique: true, // Garante que o e-mail seja único
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Por favor, forneça um e-mail válido'],
    },
    senhaHash: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        minlength: [8, 'A senha deve ter pelo menos 8 caracteres'],
    },
    criadoEm: {
        type: Date,
        default: Date.now,
    },
});
// Middleware para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
    if (this.isModified('senhaHash')) {
        this.senhaHash = await bcrypt.hash(this.senhaHash, 10); // Gera hash com salt de 10 rounds
    }
    next();
});

// Método para comparar senha
userSchema.methods.compararSenha = async function (senhaCandidata) {
    return await bcrypt.compare(senhaCandidata, this.senhaHash);
};

module.exports = mongoose.model('User', userSchema);