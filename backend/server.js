require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db.js');

const authRoutes = require('./routes/auth.routes');
const txRoutes   = require('./routes/transactions.routes');


const app = express();

// Middlewares
app.use(cors());                            
app.use(express.json());                      

// Conectar ao MongoDB antes de iniciar
connectDB();

// Rotas públicas
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/transactions', txRoutes);

// Rota de teste
app.get('/', (req, res) => res.send('✔️ API Online'));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));