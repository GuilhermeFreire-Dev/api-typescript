import { create } from "./Create";
import { deleteById } from "./DeleteById";
import { getAll } from "./GetAll";
import { getById } from "./GetById";
import { getByIds } from "./GetByIds";
import { update } from "./Update";

export const DisciplineRepository = {
  create,
  update,
  deleteById,
  getById,
  getAll,
  getByIds,
};
