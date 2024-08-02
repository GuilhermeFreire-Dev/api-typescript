import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtService } from "../services";
import { EJwtErrors, JwtError } from "../exceptions/JwtError";

export const authentication: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Solicitação não autorizada"
      }
    });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "O tipo de token fornecido é inválido"
      }
    });
  }

  try {
    JwtService.verify(token);
  } catch (error) {
    const err = error as JwtError;
    return res.status(
      err.type === EJwtErrors.INVALID_TOKEN
        ? StatusCodes.UNAUTHORIZED
        : StatusCodes.INTERNAL_SERVER_ERROR
    ).json({
      error: {
        default: err.message
      }
    });
  }
  return next();
};