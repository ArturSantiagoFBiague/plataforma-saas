import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
export const hashString = (str: string) => {
  return bcrypt.hashSync(str, 10);
};
export const compareHash = (str: string, hash: string) => {
  return bcrypt.compareSync(str, hash);
};  
