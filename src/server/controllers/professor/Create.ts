import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { UserRepository } from "../../database/repositories";
import { Professor } from "../../database/entities/Professor.entity";
import { TeacherRepository } from "../../database/repositories/professor";

interface IBodyProps extends Omit<Professor, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      cpf: yup.string().required().length(11),
      nome: yup.string().required().min(3),
      email: yup.string().required().email(),
      dataNasc: yup.date().required(),
      telefonePrincipal: yup.string().required().min(11),
      telefoneSecundario: yup.string().min(11),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const teacher = await TeacherRepository.create(req.body);

  if (teacher instanceof RepositoryError) {
    return res
      .status(
        teacher.errorType === ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.BAD_REQUEST
      )
      .json({
        errors: {
          default: teacher.message,
        },
      });
  }

  const user = await UserRepository.create({
    senha: teacher.cpf,
  });

  if (user instanceof RepositoryError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: user.message,
      },
    });
  }

  teacher.usuario = user;

  TeacherRepository.update(teacher);

  delete teacher.usuario;

  return res.status(StatusCodes.CREATED).json(teacher);
};
