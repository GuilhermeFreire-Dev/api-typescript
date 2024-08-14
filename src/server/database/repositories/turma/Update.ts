import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../..";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../../shared/exceptions/RepositoryError";
import { Disciplina } from "../../entities/Disciplina.entity";
import { Turma } from "../../entities/Turma.entity";

export const update = async (
  team: Omit<Turma, "status" | "codigo" | "disciplinas">,
  disciplines?: Disciplina[]
): Promise<void | RepositoryError> => {
  try {
    await AppDataSource.createQueryBuilder()
      .relation(Turma, "disciplinas")
      .of(team)
      .add(disciplines);
    return;
  } catch (error) {
    const err = error as QueryFailedError;
    if (err.message.includes("duplicate")) {
      return new RepositoryError(
        "Disciplina já vinculada a essa turma",
        ERepositoryErrors.DATABASE_CONSTRAINT_ERROR
      );
    }

    return new RepositoryError(
      "Ocorreu um erro ao atualizar os dados da turma",
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};
