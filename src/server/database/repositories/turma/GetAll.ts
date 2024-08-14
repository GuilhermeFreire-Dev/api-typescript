import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Turma } from "../../entities/Turma.entity";

export const getAll = async (
  filter?: string,
  page = 0,
  limit = 10
): Promise<Turma[] | RepositoryError> => {
  try {
    let teams: Turma[] = [];

    if (filter) {
      teams = await AppDataSource.getRepository(Turma)
        .createQueryBuilder()
        .where("codigo = :codigo", { codigo: filter })
        .limit(limit)
        .offset(page)
        .getMany();
    } else {
      teams = await AppDataSource.getRepository(Turma)
        .createQueryBuilder()
        .limit(limit)
        .offset(page)
        .getMany();
    }

    if (teams.length === 0) {
      return new RepositoryError(
        "Nenhum registro encontrado",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return teams;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao buscar as turmas",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
