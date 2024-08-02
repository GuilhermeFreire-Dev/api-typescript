
import { AppDataSource } from "../..";
import { User } from "../../entity";

export const getByEmail = async (email: string): Promise<User | null | Error> => {
  try {
    const searchedUser = await AppDataSource.getRepository(User).findOne({
      where: {
        email: email
      }
    });
    return searchedUser;

  } catch (error) {    
    return new Error("Ocorreu um erro ao cadastrar o usuário");
  }
};