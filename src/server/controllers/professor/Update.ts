import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { Professor } from "../../database/entities/Professor.entity";
import { TeacherRepository } from "../../database/repositories";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<Professor, "id"> {}

export const updateValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    })
  ),
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

export const update = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  const teacher = await TeacherRepository.update({
    ...req.body,
    id: req.params.id!,
  });

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

  return res.status(StatusCodes.OK).json(teacher);
};
