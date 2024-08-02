import { Request, Response } from "express";
import { User } from "../../database/entity";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { UserRepository } from "../../database/repositories";
import { StatusCodes } from "http-status-codes";
import { JwtService, PasswordCrypto } from "../../shared/services";
import { EJwtErrors, JwtError } from "../../shared/exceptions/JwtError";

interface IBodyProps extends Omit<User, "id" | "nome"> { }

export const loginValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required()
  }))
}));

export const login = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const user = await UserRepository.getByEmail(req.body.email);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: {
        default: "Usuário não encontrado"
      }
    });
  }

  if (user instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        default: user.message
      }
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(req.body.senha, user.senha);

  if (!passwordMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        default: "Senha incorreta"
      }
    });
  }

  try {
    const accessToken = JwtService.sign({ uid: user.id });
    return res.status(StatusCodes.OK).json({
      token: accessToken,
    });

  } catch (error) {
    const err = error as JwtError;
    return res.status(
      err.type === EJwtErrors.INVALID_TOKEN
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR
    ).json({
      error: {
        default: err.message
      }
    });
  }
};