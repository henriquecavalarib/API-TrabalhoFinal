const validateBook = (req, res, next) => {
    const { titulo, autor, ano, genero, estoque } = req.body;
    const errors = [];

    // Validação de campos obrigatórios
    if (!titulo || typeof titulo !== 'string') {
        errors.push("O campo 'titulo' é obrigatório e deve ser uma string.");
    }

    if (!autor || typeof autor !== 'string') {
        errors.push("O campo 'autor' é obrigatório e deve ser uma string.");
    }

    // Validação de lógica de negócio (Ano)
    const currentYear = new Date().getFullYear();
    if (ano && (isNaN(ano) || ano > currentYear)) {
        errors.push(`O campo 'ano' deve ser um número válido e não pode ser maior que ${currentYear}.`);
    }

    // Validação de Estoque (Não pode ser negativo)
    if (estoque !== undefined && (isNaN(estoque) || estoque < 0)) {
        errors.push("O campo 'estoque' deve ser um número maior ou igual a zero.");
    }

    // Se houver erros, interrompe a requisição aqui
    if (errors.length > 0) {
        return res.status(400).json({ 
            status: "Erro de Validação",
            messages: errors 
        });
    }

    // Se estiver tudo ok, prossegue para a rota
    next();
};

module.exports = { validateBook };