import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { TeamRepository } from "../../database/repositories";

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
  const teams = await TeamRepository.getAll(
    req.query.filter,
    req.query.page,
    req.query.limit
  );

  if (teams instanceof RepositoryError) {
    return res
      .status(
        teams.errorType === ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.NOT_FOUND
      )
      .json({
        errors: {
          default: teams.message,
        },
      });
  }

  return res.status(StatusCodes.OK).json({
    data: teams,
    pagination: {
      page: req.query.page,
      limit: req.query.limit,
      total: teams.length,
    },
  });
};
