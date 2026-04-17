# Gerenciamento de Livraria API

Esta é uma API RESTful desenvolvida para o gerenciamento de um acervo de livros. O projeto utiliza Node.js com o framework Express e armazena os dados em um banco de dados relacional SQLite.

## Funcionalidades

* **CRUD Completo**: Criação, leitura, atualização e exclusão de registros.
* **Paginação**: Controle de volume de dados por página via parâmetros de consulta.
* **Filtros Dinâmicos**: Busca por gênero e autor diretamente na URL.
* **Ordenação**: Suporte a ordenação ascendente ou descendente baseada em colunas específicas.
* **Validação de Dados**: Middleware para garantir a integridade dos dados inseridos no banco.
* **Interface Administrativa**: Dashboard front-end integrado para interação com a API.

## Tecnologias Utilizadas

* **Runtime**: Node.js
* **Framework**: Express
* **Banco de Dados**: SQLite3
* **Comunicação**: CORS (Cross-Origin Resource Sharing)

## Estrutura de Pastas

```text
/
├── middleware/
│   └── validate.js    # Lógica de validação de campos
├── routes/
│   └── books.js       # Definição dos endpoints e lógica SQL
├── database.js        # Configuração e inicialização do SQLite
├── server.js          # Ponto de entrada da aplicação
├── index.html         # Interface front-end
└── package.json       # Dependências e scripts do projeto
```

## Instalação e Execução

### Pré-requisitos
* Node.js instalado (versão 14 ou superior)
* Gerenciador de pacotes npm

### Passo a passo

1. Instale as dependências necessárias:
   ```bash
   npm install express sqlite3 cors
   ```

2. Inicie o servidor:
   ```bash
   node server.js
   ```

3. Acesse a interface:
   Abra o arquivo `index.html` em seu navegador de preferência.

## Documentação da API

### Endpoints Principais

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| GET | `/books` | Retorna lista paginada com suporte a filtros e ordenação. |
| GET | `/books/:id` | Retorna os detalhes de um livro específico por ID. |
| POST | `/books` | Registra um novo livro no sistema. |
| PUT | `/books/:id` | Atualiza as informações de um livro existente. |
| DELETE | `/books/:id` | Remove um livro permanentemente do banco de dados. |

### Parâmetros de Consulta (Query Params)

Para o endpoint `GET /books`, os seguintes parâmetros são aceitos:

* `page`: Número da página (Padrão: 1)
* `limit`: Quantidade de registros por página (Padrão: 5)
* `genero`: Filtra livros por categoria.
* `author`: Filtra livros pelo nome do autor.
* `sortBy`: Coluna para ordenação (id, titulo, ano, estoque).
* `order`: Direção da ordenação (ASC ou DESC).

## Regras de Validação

O sistema valida as seguintes condições antes de processar requisições POST e PUT:

1.  **Título**: Obrigatório e deve ser uma string.
2.  **Autor**: Obrigatório e deve ser uma string.
3.  **Ano**: Não pode ser superior ao ano atual.
4.  **Estoque**: Deve ser um número inteiro positivo ou zero.

## Códigos de Resposta (Status Codes)

* `200 OK`: Operação realizada com sucesso.
* `201 Created`: Registro criado com sucesso.
* `204 No Content`: Registro excluído com sucesso.
* `400 Bad Request`: Erro de validação nos dados enviados.
* `404 Not Found`: Registro ou rota não localizada.
* `500 Internal Server Error`: Falha inesperada no servidor.