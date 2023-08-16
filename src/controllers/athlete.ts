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
  static async create(req: Request, res: Response) {
    /* CREATE EXAMPLE
    {
      "fields": {
          "identifier": 26082103,
          "third_place": 0,
          "second_place": 0,
          "email": "wendyhurtado95@gmail.com",
          "first_name": "Wendy",
          "gender": "female",
          "date_of_bird": "1995-04-19",
          "phone": "04123598711",
          "disability": "No posee",
          "address": "Cotoperíz",
          "last_name": "Hurtado",
          "first_place": 0,
          "belt_id": ["reclwDvP3dFCOyvj8"]
      }
  }
  */

    try {
      const { fields } = req.body;
      const response = await AthleteModel.create(fields);
      res.json(response);
    } catch (error) {
      res.status(500).json(error).end();
    }
  }
}
