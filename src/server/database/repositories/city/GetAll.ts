import { AppDataSource } from "../../data-source";
import { City } from "../../entity/City.entity";

export const getAll = async () => {
  return await AppDataSource.getRepository(City).find();
}