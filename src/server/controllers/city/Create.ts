import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware/Validation";
import { StatusCodes } from "http-status-codes";

interface IBodyProps {
  nome: string,
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3)
  }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  return res.status(StatusCodes.CREATED).json({
    id: 1,
    nome: req.body.nome
  });
}