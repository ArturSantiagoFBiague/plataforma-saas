"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const prisma_1 = require("../lib/prisma");
const getUsers = async (_, res) => {
    try {
        const users = await prisma_1.prisma.user.findMany();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { id } });
        if (!user)
            return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário', error: err });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updated = await prisma_1.prisma.user.update({
            where: { id },
            data,
        });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: err });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_1.prisma.user.delete({ where: { id } });
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error: err });
    }
};
exports.deleteUser = deleteUser;
