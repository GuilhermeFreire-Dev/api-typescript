import { AppDataSource } from "../../data-source"
import { City } from "../../entity"

export const create = async (city: Omit<City, 'id'>) => {
  return await AppDataSource.getRepository(City).save(city);
}