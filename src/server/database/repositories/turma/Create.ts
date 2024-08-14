import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Turma } from "../../entities/Turma.entity";

export const create = async (
  team: Omit<Turma, "id" | "status">
): Promise<Turma | RepositoryError> => {
  try {
    return await AppDataSource.getRepository(Turma).save(team);
  } catch (error) {
    const err = error as Error;
    if (err.message.includes("unique")) {
      return new RepositoryError(
        "Turma já cadastrada na base de dados",
        ERepositoryErrors.DATABASE_CONSTRAINT_ERROR
      );
    }
    return new RepositoryError(
      "Ocorreu um erro ao cadastrar a turma",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
