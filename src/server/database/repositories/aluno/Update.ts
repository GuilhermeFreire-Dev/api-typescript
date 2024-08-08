import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Aluno } from "../../entities/Aluno.entity";

export const update = async (
  student: Aluno
): Promise<Aluno | RepositoryError> => {
  try {
    const updateResult = await AppDataSource.createQueryBuilder()
      .update(Aluno)
      .set(student)
      .where("id = :id", { id: student.id })
      .returning("*")
      .execute();

    const raws = updateResult.raw as Aluno[];
    const studentUpdated = raws.shift();

    if (!studentUpdated) {
      return new RepositoryError(
        "Nenhum registro encontrado para atualizar",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return studentUpdated;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao atualizar os dados do(a) aluno(a)",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
