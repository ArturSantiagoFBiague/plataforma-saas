"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const prisma_1 = require("../lib/prisma");
const hash_1 = require("../lib/hash");
const createUser = async (name, email, password) => {
    const hashedPassword = await (0, hash_1.hashPassword)(password);
    return prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
};
exports.createUser = createUser;
const getUserById = async (id) => {
    return prisma_1.prisma.user.findUnique({ where: { id: id.toString() } });
};
exports.getUserById = getUserById;
const getUserByEmail = async (email) => {
    return prisma_1.prisma.user.findUnique({ where: { email } });
};
exports.getUserByEmail = getUserByEmail;
