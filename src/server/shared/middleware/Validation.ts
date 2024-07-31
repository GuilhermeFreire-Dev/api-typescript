import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = "body" | "header" | "query" | "params";

type TGetSchema = <T>(schema: Schema<T>) => Schema<T>;

type TSchemas = Record<TProperty, Schema>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  
  const schemas = getAllSchemas((schemas) => schemas);
  const validationErrors: Record<string, Record<string, string>> = {}

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });
    } catch (error) {
      const yupValidationError = error as ValidationError;
      const errors: Record<string, string> = {};
      
      yupValidationError.inner.forEach(err => {
        if (err.path) errors[err.path] = err.message;
      });

      validationErrors[key] = errors;
    }
  });

  if (Object.entries(validationErrors).length === 0) {
    return next();
  }

  return res.status(StatusCodes.BAD_REQUEST).json({
    errors: validationErrors 
  });
}