import { compare, genSalt, hash } from "bcryptjs";

const SALT_RANDOM = 8;

const hashPassword =  async (password: string) => {
  const salt = await genSalt(SALT_RANDOM);
  return await hash(password, salt);
}

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
}

export const PasswordCrypto = {
  hashPassword,
  verifyPassword
}