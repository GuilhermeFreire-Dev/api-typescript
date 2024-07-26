import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (_, res) => {
  res.send("Olá mundo");
});

router.post("/test", (req, res) => {
  return res.status(StatusCodes.BAD_REQUEST).json(req.body);
})

export { router };