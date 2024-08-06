import { AppDataSource } from "../..";
import { ERepositoryErrors, RepositoryError } from "../../../shared/exceptions/RepositoryError";
import { Aluno } from "../../entities/Aluno.entity";

export const create = async (student: Omit<Aluno, "id">): Promise<Aluno | RepositoryError> => {
  try {
    return await AppDataSource.getRepository(Aluno).save(student);
    
  } catch (error) {
    const err = error as Error;
    if (err.message.includes("unique")) {
      return new RepositoryError(
        "O CPF informado já está vinculado a um outro cadastro",
        ERepositoryErrors.DATABASE_CONSTRAINT_ERROR
      );
    }  
    return new RepositoryError(
      "Ocorreu um erro ao cadastrar o usuário", 
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};