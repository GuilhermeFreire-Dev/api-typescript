import { AppDataSource } from "../..";
import { ERepositoryErrors, RepositoryError } from "../../../shared/exceptions/RepositoryError";
import { Professor } from "../../entities/Professor.entity";

export const getAll = async (
  filter?: string,
  page = 0,
  limit = 10
) : Promise<Professor[] | RepositoryError> => {
  try {

    let teachers: Professor[] = [];

    if (filter) {
      teachers = await AppDataSource.getRepository(Professor)
      .createQueryBuilder()
      .where("nome like :nome", { nome: `%${filter}%` })
      .orWhere("cpf = :cpf", { cpf: filter })
      .limit(limit)
      .offset(page)
      .getMany();
    } else {
      teachers = await AppDataSource.getRepository(Professor)
      .createQueryBuilder()
      .limit(limit)
      .offset(page)
      .getMany();
    }

    if (teachers.length === 0) {
      return new RepositoryError(
        "Nenhum registro encontrado",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return teachers;

  } catch (error) {    
    return new RepositoryError(
      "Ocorreu um erro ao buscar os dados do(a) professor(a)",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};