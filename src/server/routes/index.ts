import { Router } from "express";
import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
  res.send("Olá mundo");
});

router.post("/cities", CitiesController.createValidation, CitiesController.create);

export { router };