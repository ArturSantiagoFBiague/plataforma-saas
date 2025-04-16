import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../services/userService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const user = await createUser(name, email, password);
    return res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};
