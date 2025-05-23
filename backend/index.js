const connectDB = require('./db/db');
const User = require('./models/User');

(async () => {
    try {
        await connectDB();
        console.log('MongoDB conectado com sucesso!');

        const testUser = new User({
            nome: 'Teste Conexão',
            email: `teste_${Date.now()}@example.com`,
            senhaHash: 'teste1234',
        });
        await testUser.save();
        console.log('Documento de teste criado:', testUser);
    } catch (err) {
        console.error('Erro durante o teste:', err.message);
    }
})();