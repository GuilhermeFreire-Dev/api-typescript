import { create } from "./Create";
import { deleteById } from "./DeleteById";
import { deleteDisciplineById } from "./DeleteDisciplineById";
import { getAll } from "./GetAll";
import { getById } from "./GetById";
import { update } from "./Update";

export const TeamRepository = {
  create,
  update,
  deleteById,
  getById,
  getAll,
  deleteDisciplineById,
};
