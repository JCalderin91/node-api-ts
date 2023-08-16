import { Request, Response } from "express";
import { AthleteModel } from "../models/athlete";

export class AthleteController {
  static async getAll(req: Request, res: Response) {
    const athletes = await AthleteModel.getAll();
    res.json(athletes);
  }
  static async getOne(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) res.status(404);
    const athlete = await AthleteModel.getOne(id as string);
    res.json(athlete);
  }
}
