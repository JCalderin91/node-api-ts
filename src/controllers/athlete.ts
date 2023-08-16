import { Request, Response } from "express";
import { AthleteModel } from "../models/athlete";

export class AthleteController {
  static async getAll(req: Request, res: Response) {
    try {
      const athletes = await AthleteModel.getAll();
      res.json(athletes);
    } catch (error) {
      res.status(500).end();
    }
  }
  static async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) res.status(404);
      const athlete = await AthleteModel.getOne(id as string);
      res.json(athlete);
    } catch (error) {
      res.status(404).end();
    }
  }
}
