import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Aluno } from "../../entities/Aluno.entity";

export const getAll = async (
  filter?: string,
  page = 0,
  limit = 10
): Promise<Aluno[] | RepositoryError> => {
  try {
    let students: Aluno[] = [];

    if (filter) {
      students = await AppDataSource.getRepository(Aluno)
        .createQueryBuilder()
        .where("nome like :nome", { nome: `%${filter}%` })
        .orWhere("cpf = :cpf", { cpf: filter })
        .limit(limit)
        .offset(page)
        .getMany();
    } else {
      students = await AppDataSource.getRepository(Aluno)
        .createQueryBuilder()
        .limit(limit)
        .offset(page)
        .getMany();
    }

    if (students.length === 0) {
      return new RepositoryError(
        "Nenhum registro encontrado",
        ERepositoryErrors.NOT_FOUND
      );
    }

    return students;
  } catch (error) {
    return new RepositoryError(
      "Ocorreu um erro ao buscar os dados do(a) aluno(a)",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
