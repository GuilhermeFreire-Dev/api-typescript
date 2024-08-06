import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ERepositoryErrors, RepositoryError } from "../../shared/exceptions/RepositoryError";
import { StudentRepository } from "../../database/repositories/aluno";
import { Aluno } from "../../database/entities/Aluno.entity";

interface IBodyProps extends Omit<Aluno, "id"> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    cpf: yup.string().required().length(11),
    nome: yup.string().required().min(3),
    email: yup.string().required().email(),
    dataNasc: yup.date().required(),
    telefonePrincipal: yup.string().required().min(11),
    telefoneSecundario: yup.string().min(11),
  }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const student = await StudentRepository.create(req.body);

  if (student instanceof RepositoryError) {
    return res.status(
      student.errorType === ERepositoryErrors.DATABASE_ERROR ?
      StatusCodes.INTERNAL_SERVER_ERROR :
      StatusCodes.BAD_REQUEST
    ).json({
      errors: {
        default: student.message
      }
    });
  }
  
  return res.status(StatusCodes.CREATED).json(student);
};