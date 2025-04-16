"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já está em uso' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name }, // Ensure 'name' exists in the schema
        });
        res.status(201).json({ message: 'Usuário criado com sucesso', user });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error: err });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ message: 'Credenciais inválidas' });
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: 'Credenciais inválidas' });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.status(200).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: 'Erro no login', error: err });
    }
};
exports.login = login;
