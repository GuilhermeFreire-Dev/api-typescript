import { Router } from "express";
import { CityController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
  res.send("Olá mundo");
});

router.post("/cidades", CityController.createValidation, CityController.create);
router.get("/cidades", CityController.getAllValidation, CityController.getAll);
router.get("/cidades/:id", CityController.getByIdValidation, CityController.getById);
router.put("/cidades/:id", CityController.updateByIdValidation, CityController.updateById);
router.delete("/cidades/:id", CityController.deleteByIdValidation, CityController.deleteById);

export { router };