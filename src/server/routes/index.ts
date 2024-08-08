import { Router } from "express";
import { CityController } from "../controllers";
import { authentication } from "../shared/middleware";
import { UserController } from "../controllers/usuario";
import { StudentController } from "../controllers/aluno";
import { TeacherController } from "../controllers/professor";

const router = Router();

router.get("/", (_, res) => {
  res.send("Olá mundo");
});

router.post("/cidades", authentication, CityController.createValidation, CityController.create);
router.get("/cidades", authentication, CityController.getAllValidation, CityController.getAll);
router.get("/cidades/:id", authentication, CityController.getByIdValidation, CityController.getById);
router.put("/cidades/:id", authentication, CityController.updateByIdValidation, CityController.updateById);
router.delete("/cidades/:id", authentication, CityController.deleteByIdValidation, CityController.deleteById);

router.post("/alunos", StudentController.createValidation, StudentController.create);

router.post("/professores", TeacherController.createValidation, TeacherController.create);
router.get("/professores", TeacherController.getAllValidation, TeacherController.getAll);
router.put("/professores/:id", TeacherController.updateValidation, TeacherController.update);
router.delete("/professores/:id", TeacherController.deleteByIdValidation, TeacherController.deleteById);
router.get("/professores/:id", TeacherController.getByIdIdValidation, TeacherController.getByIdId);

router.post("/cadastrar", UserController.createValidation, UserController.create);
router.post("/login", UserController.loginValidation, UserController.login);

export { router };