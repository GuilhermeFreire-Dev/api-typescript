
export enum EJwtErrors {
  "TOKEN_NOT_FOUND",
  "INVALID_TOKEN",
  "UNEXPECTED_ERROR"
}

export class JwtError extends Error {
  
  type: EJwtErrors;

  constructor(message: string, type: EJwtErrors) {
    super(message);
    this.type = type;
  }
}