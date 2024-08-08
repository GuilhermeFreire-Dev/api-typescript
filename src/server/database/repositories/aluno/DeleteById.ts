import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Aluno } from "../../entities/Aluno.entity";
import { EStatus } from "../../entities/Pessoa.entity";

export const deleteById = async (
  id: number
): Promise<Aluno | RepositoryError> => {
  try {
    const updateResult = await AppDataSource.createQueryBuilder()
      .update(Aluno)
      .set({
        status: EStatus.INATIVO,
      })
      .where("id = :id", { id: id })
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
