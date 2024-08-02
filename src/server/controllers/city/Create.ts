import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware/Validation";
import { StatusCodes } from "http-status-codes";
import { City } from "../../database/entity";
import { CityRepository } from "../../database/repositories";

interface IBodyProps extends Omit<City, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3)
  }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const city = await CityRepository.create({
    nome: req.body.nome
  });

  return res.status(StatusCodes.CREATED).json(city);
};