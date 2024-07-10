const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let informacoesRecebidas = [];

// Rota para receber dados de cadastro via POST
app.post('/register', (req, res) => {
    const { nome, responsavel, contato, status } = req.body;
    console.log(`Dados recebidos: Nome - ${nome}, responsavel - ${responsavel}, contato - ${contato}, Status - ${status}`);
    
    // Verificar se o usuário já está na lista
    const usuarioExistente = informacoesRecebidas.find(info => info.nome === nome && info.responsavel === responsavel && info.contato == contato);
    
    if (usuarioExistente) {
        // Atualizar o status do usuário existente
        usuarioExistente.status = status;
        usuarioExistente.timestamp = new Date();
        res.json({ message: 'Status atualizado com sucesso!' });
    } else {
        // Adicionar novo usuário à lista
        informacoesRecebidas.push({ nome, responsavel, contato, status, timestamp: new Date() });
        res.json({ message: 'Dados recebidos com sucesso!' });
    }
});

// Rota para enviar as informações armazenadas
app.get('/informacoes', (req, res) => {
    res.json(informacoesRecebidas);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});