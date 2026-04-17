const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/books', bookRoutes);

app.use((req, res) => {
    res.status(404).json({ 
        error: "Rota não encontrada",
        path: req.originalUrl 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação local: http://localhost:${PORT}/books`);
});