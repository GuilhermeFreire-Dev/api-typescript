import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Disciplina } from "../../entities/Disciplina.entity";

export const update = async (
  discipline: Omit<Disciplina, "codigo" | "status">
): Promise<null | RepositoryError> => {
  try {
    const updateResult = await AppDataSource.createQueryBuilder()
      .update(Disciplina)
      .set(discipline)
      .where("id = :id", { id: discipline.id })
      .execute();

    if (updateResult.affected === 0) {
      return new RepositoryError(
        "Nenhum registro encontrado para atualizar",
        ERepositoryErrors.NOT_FOUND
      );
    }
    return null;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao atualizar os dados da disciplina",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
