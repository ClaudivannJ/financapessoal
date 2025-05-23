const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');

async function connectDB() {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI não está definida no arquivo .env. Verifique o arquivo ou o caminho.');
        }
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB conectado com sucesso!');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Erro de conexão:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB desconectado');
        });
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    }
}

connectDB();

module.exports = connectDB;