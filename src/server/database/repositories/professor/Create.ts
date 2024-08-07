import { AppDataSource } from "../..";
import { ERepositoryErrors, RepositoryError } from "../../../shared/exceptions/RepositoryError";
import { Professor } from "../../entities/Professor.entity";

export const create = async (teacher: Omit<Professor, "id">): Promise<Professor | RepositoryError> => {
  try {

    return await AppDataSource.getRepository(Professor).save(teacher);
    
  } catch (error) {
    const err = error as Error;
    if (err.message.includes("unique")) {
      return new RepositoryError(
        "Professor(a) já cadastrado na base de dados",
        ERepositoryErrors.DATABASE_CONSTRAINT_ERROR
      );
    }  
    return new RepositoryError(
      "Ocorreu um erro ao cadastrar o professor(a)", 
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};