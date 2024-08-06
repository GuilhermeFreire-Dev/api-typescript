import { AppDataSource } from "../..";
import { ERepositoryErrors, RepositoryError } from "../../../shared/exceptions/RepositoryError";
import { Aluno } from "../../entities/Aluno.entity";

export const update = async (student: Aluno): Promise<Aluno | RepositoryError> => {
  try {
    return await AppDataSource.getRepository(Aluno).save(student);

  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao cadastrar o usuário", 
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};