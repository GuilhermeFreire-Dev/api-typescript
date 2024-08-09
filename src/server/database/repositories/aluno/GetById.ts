import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Aluno } from "../../entities/Aluno.entity";

export const getById = async (id: number): Promise<Aluno | RepositoryError> => {
  try {
    const student = await AppDataSource.getRepository(Aluno).findOne({
      where: { id: id },
    });

    if (!student) {
      return new RepositoryError(
        "Aluno(a) não encontrado(a)",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return student;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao buscar os dados do(a) aluno(a)",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
