import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Disciplina } from "../../entities/Disciplina.entity";

export const getAll = async (
  filter?: string,
  page = 0,
  limit = 10
): Promise<Disciplina[] | RepositoryError> => {
  try {
    let disciplines: Disciplina[] = [];

    if (filter) {
      disciplines = await AppDataSource.getRepository(Disciplina)
        .createQueryBuilder()
        .where("nome like :nome", { nome: `%${filter}%` })
        .orWhere("codigo = :codigo", { codigo: filter })
        .limit(limit)
        .offset(page)
        .getMany();
    } else {
      disciplines = await AppDataSource.getRepository(Disciplina)
        .createQueryBuilder()
        .limit(limit)
        .offset(page)
        .getMany();
    }

    if (disciplines.length === 0) {
      return new RepositoryError(
        "Nenhum registro encontrado",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return disciplines;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao buscar os as disciplinas",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
