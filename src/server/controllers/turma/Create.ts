import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { ENivel, ETurno, Turma } from "../../database/entities/Turma.entity";
import { TeamRepository } from "../../database/repositories";

interface IBodyProps extends Omit<Turma, "id" | "disciplinas" | "status"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nivel: yup.mixed<ENivel>().oneOf(Object.values(ENivel)).required(),
      turno: yup.mixed<ETurno>().oneOf(Object.values(ETurno)).required(),
      codigo: yup.string().required().min(3),
      ano: yup.number().required().integer().min(1).max(9),
      anoLetivo: yup.number().required().integer().min(2024),
      freqMin: yup.number().required().min(1),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const team = await TeamRepository.create({
    ...req.body,
    disciplinas: [],
  });

  if (team instanceof RepositoryError) {
    return res
      .status(
        team.errorType === ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.BAD_REQUEST
      )
      .json({
        errors: {
          default: team.message,
        },
      });
  }

  return res.status(StatusCodes.CREATED).json(team);
};
