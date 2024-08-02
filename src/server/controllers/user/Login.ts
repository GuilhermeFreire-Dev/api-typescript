import { Request, Response } from "express";
import { User } from "../../database/entity";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { UserRepository } from "../../database/repositories";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<User, "id" | "nome"> {}

export const loginValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required()
  }))
}));

export const login = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const user = await UserRepository.login({
    email: req.body.email,
    senha: req.body.senha
  });

  if (user instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        default: user.message
      }
    });
  }

  return res.status(StatusCodes.OK).json({
    token: user.token,
  });
};