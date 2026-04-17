const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Use 'library.db' para persistência

db.serialize(() => {
    db.run(`CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER,
        genre TEXT,
        stock INTEGER DEFAULT 0
    )`);

    const stmt = db.prepare("INSERT INTO books (title, author, year, genre, stock) VALUES (?, ?, ?, ?, ?)");
    
    const initialBooks = [
        ['O Senhor dos Anéis', 'J.R.R. Tolkien', 1954, 'Fantasia', 10],
        ['1984', 'George Orwell', 1949, 'Distopia', 15],
        ['Dom Casmurro', 'Machado de Assis', 1899, 'Clássico', 5],
        ['O Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasia', 8],
        ['Fahrenheit 451', 'Ray Bradbury', 1953, 'Ficção Científica', 12],
        ['O Alquimista', 'Paulo Coelho', 1988, 'Fábula', 20],
        ['Brave New World', 'Aldous Huxley', 1932, 'Distopia', 7],
        ['Crime e Castigo', 'Fiódor Dostoiévski', 1866, 'Psicológico', 4],
        ['O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 1943, 'Infantil', 30],
        ['Grande Sertão: Veredas', 'Guimarães Rosa', 1956, 'Clássico', 6],
        ['Orgulho e Preconceito', 'Jane Austen', 1813, 'Romance', 11],
        ['Moby Dick', 'Herman Melville', 1851, 'Aventura', 3],
        ['Cem Anos de Solidão', 'Gabriel García Márquez', 1967, 'Realismo Mágico', 9],
        ['A Metamorfose', 'Franz Kafka', 1915, 'Existencialismo', 13],
        ['Ensaio Sobre a Cegueira', 'José Saramago', 1995, 'Ficção', 14],
        ['O Processo', 'Franz Kafka', 1925, 'Ficção', 2],
        ['Anna Karenina', 'Lev Tolstoy', 1877, 'Realismo', 5],
        ['O Sol é Para Todos', 'Harper Lee', 1960, 'Drama', 18],
        ['Drácula', 'Bram Stoker', 1897, 'Terror', 7],
        ['Frankenstein', 'Mary Shelley', 1818, 'Terror', 9]
    ];

    initialBooks.forEach(book => stmt.run(book));
    stmt.finalize();
});

module.exports = db;