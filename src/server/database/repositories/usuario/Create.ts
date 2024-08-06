import { AppDataSource } from "../..";
import { ERepositoryErrors, RepositoryError } from "../../../shared/exceptions/RepositoryError";
import { PasswordCrypto } from "../../../shared/services";
import { Usuario } from "../../entities";

export const create = async (user: Omit<Usuario, "id">): Promise<Usuario | RepositoryError> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.senha);
    return AppDataSource.getRepository(Usuario).save({
      ...user, 
      senha: hashedPassword 
    });
    
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao cadastrar o usuário",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};