
export enum ERepositoryErrors {
  "DATABASE_ERROR",
  "DATABASE_CONSTRAINT_ERROR",
  "NOT_FOUND"
}

export class RepositoryError extends Error {

  errorType: ERepositoryErrors;

  constructor(message: string, errorType: ERepositoryErrors) {
    super(message);
    this.errorType = errorType;
  }
}