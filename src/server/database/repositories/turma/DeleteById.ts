import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { ETurmaStatus, Turma } from "../../entities/Turma.entity";

export const deleteById = async (
  id: number
): Promise<Turma | RepositoryError> => {
  try {
    const updateResult = await AppDataSource.createQueryBuilder()
      .update(Turma)
      .set({
        status: ETurmaStatus.INATIVA,
      })
      .where("id = :id", { id: id })
      .returning("*")
      .execute();

    const raws = updateResult.raw as Turma[];
    const teamUpdated = raws.shift();

    if (!teamUpdated) {
      return new RepositoryError(
        "Turma não encontrada",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return teamUpdated;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao atualizar os dados da turma",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
