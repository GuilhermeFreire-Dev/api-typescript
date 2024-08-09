import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Disciplina } from "../../entities/Disciplina.entity";

export const getById = async (
  id: number
): Promise<Disciplina | RepositoryError> => {
  try {
    const disciplina = await AppDataSource.getRepository(Disciplina).findOne({
      where: { id: id },
    });

    if (!disciplina) {
      return new RepositoryError(
        "Nenhum registro encontrado",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return disciplina;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao buscar os dados da disciplina",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
