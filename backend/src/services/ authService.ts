import { prisma } from '../lib/prisma';
import { comparePasswords, hashPassword } from '../lib/hash';
import { generateToken } from '../lib/jwt';

interface AuthPayload {
  id: number;
  email: string;
}

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Senha inválida');
  }

  const token = generateToken({ id: user.id, email: user.email });

  return { user, token };
};

export const register = async (name: string, email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error('E-mail já está em uso');
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken({ id: newUser.id, email: newUser.email });

  return { user: newUser, token };
};
