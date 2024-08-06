
export enum ERepositoryErrors {
  "DATABASE_ERROR",
  "DATABASE_CONSTRAINT_ERROR"
}

export class RepositoryError extends Error {

  errorType: ERepositoryErrors;

  constructor(message: string, errorType: ERepositoryErrors) {
    super(message);
    this.errorType = errorType;
  }
}