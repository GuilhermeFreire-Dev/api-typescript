import { Request, Response } from "express";
import { Usuario } from "../../database/entities";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { JwtService, PasswordCrypto } from "../../shared/services";
import { EJwtErrors, JwtError } from "../../shared/exceptions/JwtError";
import { Pessoa } from "../../database/entities/Pessoa.entity";
import { StudentRepository } from "../../database/repositories/aluno";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";

interface IBodyProps extends Pick<Pessoa, "cpf">, Pick<Usuario, "senha"> {}

export const loginValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      cpf: yup.string().required(),
      senha: yup.string().required(),
    })
  ),
}));

export const login = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const student = await StudentRepository.getByCpf(req.body.cpf);

  if (student instanceof RepositoryError) {
    return res
      .status(
        student.errorType == ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.NOT_FOUND
      )
      .json({
        error: {
          default: student.message,
        },
      });
  }

  if (!student.usuario) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: {
        default: "Usuário não encontrado",
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    req.body.senha,
    student.usuario.senha
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        default: "Senha incorreta",
      },
    });
  }

  try {
    const accessToken = JwtService.sign({ uid: student.id });
    return res.status(StatusCodes.OK).json({
      token: accessToken,
    });
  } catch (error) {
    const err = error as JwtError;
    return res
      .status(
        err.type === EJwtErrors.INVALID_TOKEN
          ? StatusCodes.BAD_REQUEST
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json({
        error: {
          default: err.message,
        },
      });
  }
};
