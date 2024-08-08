import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { TeacherRepository } from "../../database/repositories/professor";

interface IQueryProps {
  filter?: string;
  page?: number;
  limit?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup.string(),
      page: yup.number().min(0),
      limit: yup.number().min(1).max(20),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const teachers = await TeacherRepository.getAll(
    req.query.filter,
    req.query.page,
    req.query.limit
  );

  if (teachers instanceof RepositoryError) {
    return res
      .status(
        teachers.errorType === ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.NOT_FOUND
      )
      .json({
        errors: {
          default: teachers.message,
        },
      });
  }

  return res.status(StatusCodes.OK).json({
    data: teachers,
    pagination: {
      page: req.query.page,
      limit: req.query.limit,
      total: teachers.length,
    },
  });
};
