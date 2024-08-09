import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { TeacherRepository } from "../../database/repositories/professor";
import { Disciplina } from "../../database/entities/Disciplina.entity";
import { DisciplineRepository } from "../../database/repositories/disciplina";
import { EStatus } from "../../database/entities/Pessoa.entity";

interface IBodyProps extends Omit<Disciplina, "id" | "professor" | "status"> {
  professorId: number;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      codigo: yup.string().required().length(3),
      professorId: yup.number().required().min(0),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const teacher = await TeacherRepository.getById(req.body.professorId);

  if (teacher instanceof RepositoryError) {
    return res
      .status(
        teacher.errorType === ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.NOT_FOUND
      )
      .json({
        errors: {
          default: teacher.message,
        },
      });
  }

  if (teacher.status === EStatus.INATIVO) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default:
          "Não é possível criar a disciplina. Motivo: Professor(a) inativo(a)",
      },
    });
  }

  const discipline = await DisciplineRepository.create({
    nome: req.body.nome,
    codigo: req.body.codigo.toUpperCase(),
    professor: teacher,
  });

  return res.status(StatusCodes.CREATED).json(discipline);
};
