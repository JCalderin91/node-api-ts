import { Request, Response } from "express";
import { AthleteModel } from "../models/athlete";

export class AthleteController {
  static async getAll(req: Request, res: Response) {
    const athletes = await AthleteModel.getAll();
    res.json(athletes);
  }
}
