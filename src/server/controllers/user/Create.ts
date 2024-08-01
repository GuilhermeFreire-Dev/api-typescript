import { Request, Response } from "express";
import { User } from "../../database/entity";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { UserRepository } from "../../database/repositories";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<User, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().required().email(),
    senha: yup.string().required().min(8)
  }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const user = await UserRepository.create({
    email: req.body.email,
    nome: req.body.nome,
    senha: req.body.senha
  });

  return res.status(StatusCodes.CREATED).json(user);
}