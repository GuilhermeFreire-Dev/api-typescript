
import * as jwt from "jsonwebtoken";
import { EJwtErrors, JwtError } from "../exceptions/JwtError";

interface IJwtData {
  uid: number
}

const sign = (data: IJwtData) => {
  if (!process.env.JWT_SECRET) {
    throw new JwtError("JWT_SECRET não encontrado", EJwtErrors.TOKEN_NOT_FOUND);
  }

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verify = (token: string): IJwtData => {
  if (!process.env.JWT_SECRET) {
    throw new JwtError("JWT_SECRET não encontrado", EJwtErrors.TOKEN_NOT_FOUND);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "string") {
      throw new JwtError("Token inválido", EJwtErrors.INVALID_TOKEN);
    }

    return decoded as IJwtData;
    
  } catch (error) {   
    throw new JwtError("Token inválido", EJwtErrors.INVALID_TOKEN);
  }
};

export const JwtService = {
  sign,
  verify
};