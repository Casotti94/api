import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express(); // Mover para antes de usar cors
const prisma = new PrismaClient();

// Middleware para habilitar CORS
app.use(cors());
app.use(express.json());

app.get('/usuarios', async (req, res) => { 

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age,
                evolucao: req.body.evolucao
            }
        })
    } else {
        const users = await prisma.user.findMany()
    }



    res.status(200).json(users)
})


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            evolucao: req.body.evolucao
        }
    })

    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            evolucao: req.body.evolucao
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: 'Usuário deletado com sucesso' })
})


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});