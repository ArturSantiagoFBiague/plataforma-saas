"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const prisma_1 = require("../lib/prisma");
const hash_1 = require("../lib/hash");
const jwt_1 = require("../lib/jwt");
const login = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    const isPasswordValid = await (0, hash_1.comparePasswords)(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Senha inválida');
    }
    const token = (0, jwt_1.generateToken)({ id: user.id, email: user.email });
    return { user, token };
};
exports.login = login;
const register = async (email, password) => {
    const existingUser = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Usuário já existe');
    }
    const hashedPassword = await (0, hash_1.hashPassword)(password);
    const newUser = await prisma_1.prisma.user.create({
        data: {
            name: "nome do usuario",
            email,
            password: hashedPassword,
        },
    });
    const token = (0, jwt_1.generateToken)({ id: newUser.id, email: newUser.email });
    return { user: newUser, token };
};
exports.register = register;
