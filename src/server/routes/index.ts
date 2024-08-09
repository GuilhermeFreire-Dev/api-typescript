import { Router } from "express";
import { CityController } from "../controllers";
import { authentication } from "../shared/middleware";
import { UserController } from "../controllers/usuario";
import { StudentController } from "../controllers/aluno";
import { TeacherController } from "../controllers/professor";
import { DisciplineController } from "../controllers/disciplina";

const router = Router();

router.get("/", (_, res) => {
  res.send("Olá mundo");
});

router.post(
  "/cidades",
  authentication,
  CityController.createValidation,
  CityController.create
);
router.get(
  "/cidades",
  authentication,
  CityController.getAllValidation,
  CityController.getAll
);
router.get(
  "/cidades/:id",
  authentication,
  CityController.getByIdValidation,
  CityController.getById
);
router.put(
  "/cidades/:id",
  authentication,
  CityController.updateByIdValidation,
  CityController.updateById
);
router.delete(
  "/cidades/:id",
  authentication,
  CityController.deleteByIdValidation,
  CityController.deleteById
);

router.post(
  "/alunos",
  StudentController.createValidation,
  StudentController.create
);
router.get(
  "/alunos",
  StudentController.getAllValidation,
  StudentController.getAll
);
router.put(
  "/alunos/:id",
  StudentController.updateValidation,
  StudentController.update
);
router.delete(
  "/alunos/:id",
  StudentController.deleteByIdValidation,
  StudentController.deleteById
);
router.get(
  "/alunos/:id",
  StudentController.getByIdIdValidation,
  StudentController.getByIdId
);

router.post(
  "/professores",
  TeacherController.createValidation,
  TeacherController.create
);
router.get(
  "/professores",
  TeacherController.getAllValidation,
  TeacherController.getAll
);
router.put(
  "/professores/:id",
  TeacherController.updateValidation,
  TeacherController.update
);
router.delete(
  "/professores/:id",
  TeacherController.deleteByIdValidation,
  TeacherController.deleteById
);
router.get(
  "/professores/:id",
  TeacherController.getByIdIdValidation,
  TeacherController.getByIdId
);

router.post(
  "/cadastrar",
  UserController.createValidation,
  UserController.create
);

router.get(
  "/disciplinas",
  DisciplineController.getAllValidation,
  DisciplineController.getAll
);

router.post(
  "/disciplinas",
  DisciplineController.createValidation,
  DisciplineController.create
);

router.put(
  "/disciplinas/:id",
  DisciplineController.updateValidation,
  DisciplineController.update
);

router.delete(
  "/disciplinas/:id",
  DisciplineController.deleteByIdValidation,
  DisciplineController.deleteById
);

router.post("/login", UserController.loginValidation, UserController.login);

export { router };
