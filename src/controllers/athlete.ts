import { AthleteModel } from "../models/athlete";

export class AthleteController {
  static async getAll() {
    return await AthleteModel.getAll();
  }
}
