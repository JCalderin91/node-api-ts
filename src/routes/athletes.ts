import express, { Request, Response } from "express";
import { AthleteController } from "../controllers/athlete";

export const athleteRoutes = express.Router();

athleteRoutes.get("/", async (req: Request, res: Response) => {
  const athletes = await AthleteController.getAll();
  res.json(athletes);
});
