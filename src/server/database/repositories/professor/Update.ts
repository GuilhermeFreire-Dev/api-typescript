import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Professor } from "../../entities/Professor.entity";

export const update = async (
  teacher: Professor
): Promise<Professor | RepositoryError> => {
  try {
    const updateResult = await AppDataSource.createQueryBuilder()
      .update(Professor)
      .set(teacher)
      .where("id = :id", { id: teacher.id })
      .returning("*")
      .execute();

    const raws = updateResult.raw as Professor[];
    const teacherUpdated = raws.shift();

    if (!teacherUpdated) {
      return new RepositoryError(
        "Nenhum registro encontrado para atualizar",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return teacherUpdated;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao atualizar os dados do(a) professor(a)",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
