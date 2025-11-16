import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Teste simples
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Registrar usuário
app.post("/register", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.usuario.create({
      data: { email, senha },
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Email já está em uso" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const user = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!user || user.senha !== senha) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  res.json({
    message: "Logado",
    userId: user.id,
  });
});

// Consulta mock (por enquanto)
app.post("/consulta/:tipo", async (req, res) => {
  const { tipo } = req.params;
  const { valor, userId } = req.body;

  const resultado = {
    tipo,
    valor,
    nome: "Resultado teste",
    status: "Ok",
  };

  await prisma.consulta.create({
    data: {
      tipo,
      valor,
      usuarioId: Number(userId),
      resultado,
    },
  });

  res.json(resultado);
});

// Histórico
app.get("/historico/:userId", async (req, res) => {
  const { userId } = req.params;

  const historico = await prisma.consulta.findMany({
    where: { usuarioId: Number(userId) },
    orderBy: { criadoEm: "desc" },
    take: 15,
  });

  res.json(historico);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API rodando na porta " + port));
