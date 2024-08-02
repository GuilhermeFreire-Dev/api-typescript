import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware/Validation";
import { StatusCodes } from "http-status-codes";

interface IBodyProps {
  nome: string,
}

interface IParamProps {
  id?: number,
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).send("Não implementado");
};