import { Router } from "express";
import { CityController } from "../controllers";
import { UserController } from "../controllers/user";
import { authentication } from "../shared/middleware";

const router = Router();

router.get("/", (_, res) => {
  res.send("Olá mundo");
});

router.post("/cidades", authentication, CityController.createValidation, CityController.create);
router.get("/cidades", authentication, CityController.getAllValidation, CityController.getAll);
router.get("/cidades/:id", authentication, CityController.getByIdValidation, CityController.getById);
router.put("/cidades/:id", authentication, CityController.updateByIdValidation, CityController.updateById);
router.delete("/cidades/:id", authentication, CityController.deleteByIdValidation, CityController.deleteById);

router.post("/cadastrar", UserController.createValidation, UserController.create);
router.post("/login", UserController.loginValidation, UserController.login);

export { router };