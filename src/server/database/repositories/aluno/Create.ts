import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Aluno } from "../../entities/Aluno.entity";

export const create = async (
  aluno: Omit<Aluno, "id">
): Promise<Aluno | RepositoryError> => {
  try {
    return await AppDataSource.getRepository(Aluno).save(aluno);
  } catch (error) {
    const err = error as Error;
    if (err.message.includes("unique")) {
      return new RepositoryError(
        "Aluno(a) já cadastrado na base de dados",
        ERepositoryErrors.DATABASE_CONSTRAINT_ERROR
      );
    }
    return new RepositoryError(
      "Ocorreu um erro ao cadastrar o aluno(a)",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
