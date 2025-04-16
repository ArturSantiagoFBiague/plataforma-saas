import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || "secret"

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).json({ error: "Dados inválidos" })

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(409).json({ error: "Usuário já existe" })

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({ data: { email, password: hashed } })
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })

  res.json({ token })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: "Credenciais inválidas" })

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })
  res.json({ token })
}

export const me = async (req: Request, res: Response) => {
  // @ts-ignore
  res.json({ userId: req.userId })
}
