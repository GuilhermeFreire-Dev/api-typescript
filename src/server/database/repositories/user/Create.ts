// import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../..";
import { PasswordCrypto } from "../../../shared/services";
import { User } from "../../entities";

export const create = async (user: Omit<User, "id">): Promise<User | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.senha);
    return await AppDataSource.getRepository(User).save({ ...user, senha: hashedPassword });
    
  } catch (error) {
    return new Error("Ocorreu um erro ao cadastrar o usuário");
  }
};