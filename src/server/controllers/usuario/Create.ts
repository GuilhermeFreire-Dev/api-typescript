import { Request, Response } from "express";
import { Usuario } from "../../database/entities";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { UserRepository } from "../../database/repositories";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<Usuario, "id"> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    senha: yup.string().required().min(8)
  }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const user = await UserRepository.create({
    senha: req.body.senha
  });

  if (user instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        default: user.message
      }
    });
  }

  const userFiltered: Record<string, string | number | Date> = {};

  Object.entries(user).forEach(([key, value]) => {
    if (key !== "senha" && key !== "token" && key !== "data_exp") {
      userFiltered[key] = value;
    }
  });

  return res.status(StatusCodes.CREATED).json(userFiltered);
};