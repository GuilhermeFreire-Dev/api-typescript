import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware/Validation";
import { CityRepository } from "../../database/repositories";
// import { StatusCodes } from "http-status-codes";

interface IQueryParams {
  page?: number,
  limit?: number,
  filter?: string
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryParams>(yup.object().shape({
    page: yup.number().integer().moreThan(0),
    limit: yup.number().integer().moreThan(0),
    filter: yup.string()
  }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryParams>, res: Response) => {
  return res.json(await CityRepository.getAll());
}