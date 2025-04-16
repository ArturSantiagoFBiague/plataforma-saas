import { prisma } from '../lib/prisma';
import { hashPassword } from '../lib/hash';

export const createUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

export const getUserById = async (id: number) => {
    return prisma.user.findUnique({ where: { id: id.toString() } });
};
export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
