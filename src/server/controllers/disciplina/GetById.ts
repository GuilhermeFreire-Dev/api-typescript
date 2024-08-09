import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { DisciplineRepository } from "../../database/repositories/disciplina";

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
  const discipline = await DisciplineRepository.getById(req.params.id!);

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

  return res.status(StatusCodes.OK).json(discipline);
};
