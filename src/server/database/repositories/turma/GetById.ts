import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Turma } from "../../entities/Turma.entity";

export const getById = async (id: number): Promise<Turma | RepositoryError> => {
  try {
    const team = await AppDataSource.getRepository(Turma).findOne({
      where: { id: id },
      relations: {
        disciplinas: true,
      },
    });

    if (!team) {
      return new RepositoryError(
        "Turma não encontrada",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return team;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao buscar os dados da turma",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
