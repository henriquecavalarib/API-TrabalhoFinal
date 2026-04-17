const express = require('express');
const router = express.Router();
const db = require('../database');

// GET - Listar com Filtros, Ordenação e Paginação
router.get('/', (req, res) => {
    let { page = 1, limit = 5, genre, author, sortBy = 'id', order = 'ASC' } = req.query;
    const offset = (page - 1) * limit;

    let sql = `SELECT * FROM books WHERE 1=1`;
    let params = [];

    if (genre) {
        sql += ` AND genre = ?`;
        params.push(genre);
    }
    if (author) {
        sql += ` AND author LIKE ?`;
        params.push(`%${author}%`);
    }

    // Validação básica de ordenação para evitar SQL Injection
    const validColumns = ['id', 'title', 'year', 'stock'];
    if (!validColumns.includes(sortBy)) sortBy = 'id';
    order = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    sql += ` ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({
            page: parseInt(page),
            limit: parseInt(limit),
            data: rows
        });
    });
});

// GET - Buscar por ID
// routes/books.js

router.get('/', (req, res) => {
    // Captura os query params da URL
    // Exemplo: /books?page=2&limit=5&genero=Fantasia
    let { page = 1, limit = 5, genero, author, sortBy = 'id', order = 'ASC' } = req.query;
    
    const offset = (page - 1) * limit;

    let sql = `SELECT * FROM livros WHERE 1=1`;
    let params = [];

    // Filtro por Gênero
    if (genero) {
        sql += ` AND genero = ?`;
        params.push(genero);
    }

    // Filtro por Autor (busca parcial)
    if (author) {
        sql += ` AND autor LIKE ?`;
        params.push(`%${author}%`);
    }

    // Ordenação Segura
    const colunasValidas = ['id', 'titulo', 'ano', 'estoque'];
    if (!colunasValidas.includes(sortBy)) sortBy = 'id';
    const direcao = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    sql += ` ORDER BY ${sortBy} ${direcao} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao consultar o banco de dados" });
        }
        
        // Retorna a estrutura que você viu no seu print
        res.status(200).json({
            page: parseInt(page),
            limit: parseInt(limit),
            data: rows
        });
    });
});

// POST - Criar Registro (Com validação robusta)
router.post('/', (req, res) => {
    const { title, author, year, genre, stock } = req.body;
    
    if (!title || !author || stock < 0) {
        return res.status(400).json({ error: "Dados inválidos. Verifique título, autor e estoque." });
    }

    const sql = `INSERT INTO books (title, author, year, genre, stock) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [title, author, year, genre, stock], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, ...req.body });
    });
});

// PUT - Atualizar Registro
router.put('/:id', (req, res) => {
    const { title, author, year, genre, stock } = req.body;
    const sql = `UPDATE books SET title = ?, author = ?, year = ?, genre = ?, stock = ? WHERE id = ?`;
    
    db.run(sql, [title, author, year, genre, stock, req.params.id], function(err) {
        if (this.changes === 0) return res.status(404).json({ message: "Livro não encontrado" });
        res.status(200).json({ message: "Atualizado com sucesso" });
    });
});

// DELETE - Remover Registro
router.delete('/:id', (req, res) => {
    db.run(`DELETE FROM books WHERE id = ?`, [req.params.id], function(err) {
        if (this.changes === 0) return res.status(404).json({ message: "Livro não encontrado" });
        res.status(204).send();
    });
});

module.exports = router;

const { validateBook } = require('../middleware/validate');

// Aplicado no POST
router.post('/', validateBook, (req, res) => {
    // ... lógica de inserção
});

// Aplicado no PUT
router.put('/:id', validateBook, (req, res) => {
    // ... lógica de atualização
});