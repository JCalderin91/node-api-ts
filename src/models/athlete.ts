import { Athlete } from "./../interfaces/athlete";
import { AirtableService } from "../services/airtable";

export class AthleteModel {
  static getAll(): Promise<Athlete[]> {
    return AirtableService.getAll<Athlete>({ table: "students" });
  }
  static getOne(id: string): Promise<Athlete> {
    return AirtableService.getOne({ id, table: "students" });
  }
  static create(fields: Athlete[]): Promise<Athlete[]> {
    return AirtableService.create({ fields, table: "students" });
  }
  static update(payload: { id: string; fields: Athlete }): Promise<Athlete> {
    return AirtableService.put({ payload, table: "students" });
  }
  static delete(id: string): Promise<Athlete[]> {
    return AirtableService.delete({ id, table: "students" });
  }
}
