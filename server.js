const express = require('express');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Rotas da API
app.use('/books', bookRoutes);

// Middleware para tratamento de rotas não encontradas (404)
app.use((req, res) => {
    res.status(404).json({ 
        error: "Rota não encontrada",
        path: req.originalUrl 
    });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação local: http://localhost:${PORT}/books`);
});