const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para permitir CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware para permitir que o Express interprete JSON em requisições
app.use(express.json());

// Array para armazenar informações recebidas
let informacoesRecebidas = [];

// Rota raiz para requisições GET
app.get('/', (req, res) => {
    res.send('Servidor está rodando!');
});

// Rota para receber dados de cadastro via POST
app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;
    console.log(`Dados recebidos: Nome - ${nome}, Email - ${email}, Senha - ${senha}`);
    
    // Adiciona os dados recebidos ao array
    informacoesRecebidas.push({ nome, email, senha });

    res.json({ message: 'Dados recebidos com sucesso!' });
});

// Rota para enviar as informações armazenadas via GET
app.get('/informacoes', (req, res) => {
    console.log('Recebido um GET request em /informacoes');
    res.json(informacoesRecebidas);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});