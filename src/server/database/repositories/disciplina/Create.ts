import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Disciplina } from "../../entities/Disciplina.entity";

export const create = async (
  discipline: Omit<Disciplina, "id" | "status">
): Promise<Disciplina | RepositoryError> => {
  try {
    return await AppDataSource.getRepository(Disciplina).save(discipline);
  } catch (error) {
    const err = error as Error;
    if (err.message.includes("unique")) {
      return new RepositoryError(
        "Disciplina já cadastrada na base de dados",
        ERepositoryErrors.DATABASE_CONSTRAINT_ERROR
      );
    }
    return new RepositoryError(
      "Ocorreu um erro ao cadastrar a disciplina",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
