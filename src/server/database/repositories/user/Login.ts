
import moment from "moment";
import { AppDataSource } from "../..";
import { PasswordCrypto } from "../../../shared/services";
import { User } from "../../entity";

export const login = async (user: Omit<User, "id" | "nome">): Promise<User | Error> => {
  try {
    const searchedUser = await AppDataSource.getRepository(User).findOne({
      where: {
        email: user.email
      }
    });

    if (!searchedUser) {
      return new Error("Usuário não encontrado");
    }

    if (!await PasswordCrypto.verifyPassword(user.senha, searchedUser.senha)) {
      return new Error("Senha incorreta");
    }
    
    const tokenDate = moment(searchedUser.data_exp);

    if (searchedUser.token && tokenDate.diff(moment()) > 0) {
      return searchedUser;
    }
    
    searchedUser.token = "token.token.token";

    await AppDataSource.getRepository(User).update(searchedUser.id, {
      token: searchedUser.token,
      data_exp: moment().add(1, "day")
    });

    return searchedUser;

  } catch (error) {    
    return new Error("Ocorreu um erro ao cadastrar o usuário");
  }
};