import { AppDataSource } from "../..";
import { City } from "../../entities/City.entity";

export const getAll = async () => {
  return await AppDataSource.getRepository(City).find();
};