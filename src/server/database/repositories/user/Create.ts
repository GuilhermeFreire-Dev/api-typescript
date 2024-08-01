import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../.."
import { PasswordCrypto } from "../../../shared/services";
import { User } from "../../entity"

export const create = async (user: Omit<User, 'id'>) => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.senha);
    return await AppDataSource.getRepository(User).save({ ...user, senha: hashedPassword });
  } catch (error) {
    // TODO melhorar resposta em caso de erros
    console.log(error);
    const dataSourceError = error as QueryFailedError
    return {
      error: dataSourceError.message
    }
  }
}