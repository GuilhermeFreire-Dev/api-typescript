import { Request, Response } from "express";

interface CreateCityInterface {
  name: string
}

export const create = (req: Request<{}, {}, CreateCityInterface>, res: Response) => {
  console.log(req.body.name);
  
  return res.send("create");
}