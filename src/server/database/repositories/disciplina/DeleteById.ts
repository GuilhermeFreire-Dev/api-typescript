import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import {
  Disciplina,
  EDisciplinaStatus,
} from "../../entities/Disciplina.entity";

export const deleteById = async (
  id: number
): Promise<Disciplina | RepositoryError> => {
  try {
    const updateResult = await AppDataSource.createQueryBuilder()
      .update(Disciplina)
      .set({
        status: EDisciplinaStatus.INATIVA,
      })
      .where("id = :id", { id: id })
      .returning("*")
      .execute();

    const raws = updateResult.raw as Disciplina[];
    const disciplineUpdated = raws.shift();

    if (!disciplineUpdated) {
      return new RepositoryError(
        "Disciplina não encontrada",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return disciplineUpdated;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao atualizar os dados da disciplina",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
