import express, { Request, Response } from "express";
import { AthleteController } from "../controllers/athlete";

export const athleteRoutes = express.Router();

athleteRoutes.get("/", AthleteController.getAll);
athleteRoutes.get("/:id", AthleteController.getOne);
athleteRoutes.post("/", AthleteController.create);
