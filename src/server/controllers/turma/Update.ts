import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  ERepositoryErrors,
  RepositoryError,
} from "../../shared/exceptions/RepositoryError";
import { ENivel, ETurno, Turma } from "../../database/entities/Turma.entity";
import {
  DisciplineRepository,
  TeamRepository,
} from "../../database/repositories";
import { Disciplina } from "../../database/entities/Disciplina.entity";

interface IParamProps {
  id?: number;
}

interface IBodyProps
  extends Omit<Turma, "id" | "status" | "codigo" | "disciplinas"> {
  disciplinas?: number[];
}

export const updateValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().required().moreThan(0),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nivel: yup.mixed<ENivel>().oneOf(Object.values(ENivel)).required(),
      turno: yup.mixed<ETurno>().oneOf(Object.values(ETurno)).required(),
      ano: yup.number().required().integer().min(1).max(9),
      anoLetivo: yup.number().required().integer().min(2024),
      freqMin: yup.number().required().min(1),
      disciplinas: yup.array().of(yup.number().integer().required()),
    })
  ),
}));

export const update = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  let disciplines: Disciplina[] = [];
  if (req.body.disciplinas?.length) {
    const disciplineResult = await DisciplineRepository.getByIds(
      req.body.disciplinas!
    );
    if (disciplineResult instanceof RepositoryError) {
      return res
        .status(
          disciplineResult.errorType === ERepositoryErrors.DATABASE_ERROR
            ? StatusCodes.INTERNAL_SERVER_ERROR
            : StatusCodes.NOT_FOUND
        )
        .json({
          errors: {
            default: disciplineResult.message,
          },
        });
    }
    disciplines = disciplineResult;
  }

  const teamResult = await TeamRepository.update(
    {
      ...req.body,
      id: req.params.id!,
    },
    disciplines
  );

  if (teamResult instanceof RepositoryError) {
    return res
      .status(
        teamResult.errorType === ERepositoryErrors.DATABASE_ERROR
          ? StatusCodes.INTERNAL_SERVER_ERROR
          : StatusCodes.BAD_REQUEST
      )
      .json({
        errors: {
          default: teamResult.message,
        },
      });
  }

  const team = await TeamRepository.getById(req.params.id!);

  return res.status(StatusCodes.OK).json(team);
};
