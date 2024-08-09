import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Professor } from "../../entities/Professor.entity";

export const getById = async (
  id: number
): Promise<Professor | RepositoryError> => {
  try {
    const teacher = await AppDataSource.getRepository(Professor).findOne({
      where: { id: id },
    });

    if (!teacher) {
      return new RepositoryError(
        "Nenhum registro encontrado",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return teacher;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao buscar os dados do(a) professor(a)",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
