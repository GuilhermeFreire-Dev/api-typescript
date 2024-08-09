import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { DisciplineRepository } from "../../database/repositories/disciplina";

interface IQueryProps {
  filter?: string;
  page?: number;
  limit?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup.string().min(3),
      page: yup.number().min(0),
      limit: yup.number().min(1).max(20),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const disciplines = await DisciplineRepository.getAll(
    req.query.filter,
    req.query.page,
    req.query.limit
  );

  if (disciplines instanceof RepositoryError) {
    return res
      .status(
        disciplines.errorType === ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.NOT_FOUND
      )
      .json({
        errors: {
          default: disciplines.message,
        },
      });
  }

  return res.status(StatusCodes.OK).json({
    data: disciplines,
    pagination: {
      page: req.query.page,
      limit: req.query.limit,
      total: disciplines.length,
    },
  });
};
