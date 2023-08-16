import { Athlete } from "./../interfaces/athlete";
import { AirtableService } from "../services/airtable";

export class AthleteModel {
  static getAll(): Promise<Athlete[]> {
    return AirtableService.getAll<Athlete>({ table: "students" });
  }
  static getOne(uuid: string): Promise<Athlete> {
    return AirtableService.getOne({ uuid, table: "students" });
  }
  static create(fields: Athlete[]): Promise<Athlete[]> {
    return AirtableService.create({ fields, table: "students" });
  }
}
