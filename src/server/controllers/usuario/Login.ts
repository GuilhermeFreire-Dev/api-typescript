import { Request, Response } from "express";
import { Usuario } from "../../database/entities";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { JwtService, PasswordCrypto } from "../../shared/services";
import { EJwtErrors, JwtError } from "../../shared/exceptions/JwtError";
import { Pessoa } from "../../database/entities/Pessoa.entity";
import { StudentRepository } from "../../database/repositories/aluno";

interface IBodyProps extends Pick<Pessoa, "cpf">, Pick<Usuario, "senha"> { }

export const loginValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    cpf: yup.string().required(),
    senha: yup.string().required()
  }))
}));

export const login = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const user = await StudentRepository.findByCpf(req.body.cpf);

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
      err.type === EJwtErrors.INVALID_TOKEN ? 
      StatusCodes.BAD_REQUEST : 
      StatusCodes.INTERNAL_SERVER_ERROR
    ).json({
      error: {
        default: err.message
      }
    });
  }
};