import * as create from "./Create";
import * as update from "./Update";
import * as deleteById from "./DeleteById";
import * as getByIdId from "./GetById";
import * as getAll from "./GetAll";

export const StudentController = {
  ...create,
  ...update,
  ...deleteById,
  ...getByIdId,
  ...getAll,
};
