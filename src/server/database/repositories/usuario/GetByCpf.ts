
import { AppDataSource } from "../..";
import { Usuario } from "../../entities";
import { Pessoa } from "../../entities/Pessoa.entity";

export const getByCpf = async (cpf: string): Promise<Usuario | undefined | Error> => {
  try {
    const searchedUser = await AppDataSource.getRepository(Pessoa).findOne({
      relations: {
        usuario: true
      },
      where: {
        cpf: cpf
      }
    });
    
    if (!searchedUser) {
      return new Error("Usuário não encontrado");
    }
    
    return searchedUser.usuario;

  } catch (error) { 
    console.log(error);
    
    return new Error("Ocorreu um erro ao cadastrar o usuário");
  }
};
