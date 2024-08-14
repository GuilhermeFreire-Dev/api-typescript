import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Disciplina } from "../../entities/Disciplina.entity";

export const getByIds = async (
  ids: number[]
): Promise<Disciplina[] | RepositoryError> => {
  try {
    const disciplines = await AppDataSource.getRepository(Disciplina)
      .createQueryBuilder()
      .where("id in (:...ids)", { ids: ids })
      .getMany();

    if (disciplines.length === 0) {
      return new RepositoryError(
        "Nenhuma disciplina encontrada",
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
