const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const usuarios = [
  {
    id: 1,
    nome: 'Ana Silva',
    email: 'ana@email.com'
  },
  {
    id: 2,
    nome: 'Bruno Souza',
    email: 'bruno@email.com'
  },
  {
    id: 3,
    nome: 'Carla Oliveira',
    email: 'carla@email.com'
  }
]


const depoimentos = [
  { id: 1, nome: 'Maria Souza', mensagem: 'Que perfil incrível!' },
  { id: 2, nome: 'Pedro Lima', mensagem: 'Muito bom, parabéns!' }
]

app.get('/depoimentos', (req, res) => {
  res.json(depoimentos)
})

app.post('/depoimentos', (req, res) => {
  const { nome, mensagem } = req.body

  if (!nome || !mensagem) {
    return res.status(400).json({ erro: 'Nome e mensagem são obrigatórios' })
  }

  const novo = { id: depoimentos.length + 1, nome, mensagem }
  depoimentos.push(novo)

  res.status(201).json(novo)
})

app.get('/usuarios', (req, res) => {
  res.json(usuarios)
})

app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const usuario = usuarios.find(u => u.id === id)

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' })
  }

  res.json(usuario)
})

app.post('/usuarios', (req, res) => {
  const nome = req.body.nome
  const email = req.body.email

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e e-mail são obrigatorios' })
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email
  }

  usuarios.push(novoUsuario)

  res.status(201).json(novoUsuario)
})

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = usuarios.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' })
  }

  const nome = req.body.nome
  const email = req.body.email

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e e-mail são obrigatorios' })
  }

  usuarios[index] = { id, nome, email }

  res.json(usuarios[index])
})

app.patch('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = usuarios.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' })
  }

  const nome = req.body.nome
  const email = req.body.email

  if (nome) usuarios[index].nome = nome
  if (email) usuarios[index].email = email

  res.json(usuarios[index])
})

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = usuarios.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' })
  }

  usuarios.splice(index, 1)

  res.status(204).send()
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});