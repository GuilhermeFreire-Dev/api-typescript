import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface CreateCityInterface {
  name: string
}

const validation: yup.Schema<CreateCityInterface> = yup.object().shape({
  name: yup.string().required().min(3)
});

export const create = async(req: Request<{}, {}, CreateCityInterface>, res: Response) => {
  let validatedData: CreateCityInterface | undefined = undefined;

  try {
    validatedData = await validation.validate(req.body);
  } catch (error) {
    const validationError = error as yup.ValidationError;
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationError.message
    });
  }
  
  return res.json(validatedData);
}