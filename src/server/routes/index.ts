import { Router } from "express";
import { CityController } from "../controllers";
import { UserController } from "../controllers/user";

const router = Router();

router.get("/", (_, res) => {
  res.send("Olá mundo");
});

router.post("/cidades", CityController.createValidation, CityController.create);
router.get("/cidades", CityController.getAllValidation, CityController.getAll);
router.get("/cidades/:id", CityController.getByIdValidation, CityController.getById);
router.put("/cidades/:id", CityController.updateByIdValidation, CityController.updateById);
router.delete("/cidades/:id", CityController.deleteByIdValidation, CityController.deleteById);

router.post("/cadastrar", UserController.createValidation, UserController.create);
router.post("/login", UserController.loginValidation, UserController.login);

export { router };