import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware/Validation";

interface ICity {
  nome: string,
  estado: string
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3)
  }))
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  return res.json(req.body);
}