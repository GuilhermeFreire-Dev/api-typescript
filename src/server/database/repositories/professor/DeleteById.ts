import { AppDataSource } from "../..";
import { ERepositoryErrors, RepositoryError } from "../../../shared/exceptions/RepositoryError";
import { EStatus } from "../../entities/Pessoa.entity";
import { Professor } from "../../entities/Professor.entity";

export const deleteById = async (id: number): Promise<Professor | RepositoryError> => {
  try {

    const updateResult = await AppDataSource.getRepository(Professor)
    .createQueryBuilder()
    .update({
      status: EStatus.INATIVO
    })
    .where("id = :id", { id: id })
    .returning("*")
    .execute();

    const raws = updateResult.raw as Professor[];
    const teacherUpdated = raws.shift();

    if (!teacherUpdated) {
      return new RepositoryError(
        "Nenhum registro encontrado para atualizar", 
        ERepositoryErrors.NOT_FOUND
      );
    }
    
    return teacherUpdated;

  } catch (error) {    
    return new RepositoryError(
      "Ocorreu um erro ao atualizar os dados do(a) professor(a)", 
      ERepositoryErrors.DATABASE_ERROR
    );
  }
};