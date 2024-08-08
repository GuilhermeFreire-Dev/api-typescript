import { create } from "./Create";
import { deleteById } from "./DeleteById";
import { getAll } from "./GetAll";
import { getByCpf } from "./GetByCpf";
import { getById } from "./GetById";
import { update } from "./Update";

export const StudentRepository = {
  create,
  update,
  deleteById,
  getById,
  getAll,
  getByCpf,
};
