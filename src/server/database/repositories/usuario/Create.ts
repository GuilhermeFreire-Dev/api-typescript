// import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../..";
import { PasswordCrypto } from "../../../shared/services";
import { Usuario } from "../../entities";

export const create = async (user: Omit<Usuario, "id">): Promise<Usuario | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.senha);
    return await AppDataSource.getRepository(Usuario).save({ ...user, senha: hashedPassword });
    
  } catch (error) {
    return new Error("Ocorreu um erro ao cadastrar o usuário");
  }
};