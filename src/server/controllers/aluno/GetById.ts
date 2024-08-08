import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { StudentRepository } from "../../database/repositories/aluno";

interface IParamProps {
  id?: number;
}

export const getByIdIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    })
  ),
}));

export const getByIdId = async (req: Request<IParamProps>, res: Response) => {
  const student = await StudentRepository.getById(req.params.id!);

  if (student instanceof RepositoryError) {
    return res
      .status(
        student.errorType === ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.NOT_FOUND
      )
      .json({
        errors: {
          default: student.message,
        },
      });
  }

  return res.status(StatusCodes.OK).json(student);
};
