import { Athlete } from "./../interfaces/athlete";
import { AirtableService } from "../services/airtable";

export class AthleteModel {
  static async getAll(): Promise<Athlete[]> {
    return AirtableService.getAll<Athlete>({ table: "students" });
  }
}
