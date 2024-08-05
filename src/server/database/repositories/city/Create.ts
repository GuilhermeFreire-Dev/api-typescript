import { AppDataSource } from "../..";
import { City } from "../../entities";

export const create = async (city: Omit<City, "id">) => {
  return await AppDataSource.getRepository(City).save(city);
};