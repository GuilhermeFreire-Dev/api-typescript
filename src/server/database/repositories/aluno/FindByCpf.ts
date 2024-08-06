
import { AppDataSource } from "../..";
import { ERepositoryErrors, RepositoryError } from "../../../shared/exceptions/RepositoryError";
import { Usuario } from "../../entities";
import { Aluno } from "../../entities/Aluno.entity";

export const findByCpf = async (cpf: string): Promise<Usuario | RepositoryError> => {
  try {
    const searchedUser = await AppDataSource.getRepository(Aluno).findOne({
      relations: {
        usuario: true
      },
      where: {
        cpf: cpf
      }
    });
    
    if (!searchedUser || !searchedUser.usuario) {
      return new RepositoryError(
        "Usuário não encontrado",
        ERepositoryErrors.NOT_FOUND
      );
    }
    
    return searchedUser.usuario;

  } catch (error) { 
    return new RepositoryError(
      "Ocorreu um erro ao cadastrar o usuário",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
