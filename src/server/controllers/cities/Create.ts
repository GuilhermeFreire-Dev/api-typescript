import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface CreateCityInterface {
  nome: string,
  estado: string
}

const validation: yup.Schema<CreateCityInterface> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3)
});

export const create = async(req: Request<{}, {}, CreateCityInterface>, res: Response) => {
  let validatedData: CreateCityInterface | undefined = undefined;

  try {
    validatedData = await validation.validate(req.body, { abortEarly: false });
  } catch (error) {
    const yupValidationError = error as yup.ValidationError;
    const errors: Record<string, string> = {};
    
    yupValidationError.inner.forEach(err => {      
      if (err.path) errors[err.path] = err.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errors
    });
  }
  
  return res.json(validatedData);
}