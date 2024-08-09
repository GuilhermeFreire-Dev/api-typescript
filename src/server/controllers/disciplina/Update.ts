import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { TeacherRepository } from "../../database/repositories/professor";
import { EStatus } from "../../database/entities/Pessoa.entity";
import { DisciplineRepository } from "../../database/repositories/disciplina";

interface IParamProps {
  id?: number;
}

interface IBodyProps {
  nome: string;
  professorId: number;
}

export const updateValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      professorId: yup.number().required().min(0),
    })
  ),
}));

export const update = async (
  req: Request<IParamProps, {}, IBodyProps>,
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
          "Não é possível atualizar a disciplina. Motivo: Professor(a) inativo(a)",
      },
    });
  }

  const discipline = DisciplineRepository.update({
    id: req.params.id!,
    nome: req.body.nome,
    professor: teacher,
  });

  if (discipline instanceof RepositoryError) {
    return res
      .status(
        discipline.errorType === ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.NOT_FOUND
      )
      .json({
        errors: {
          default: discipline.message,
        },
      });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
