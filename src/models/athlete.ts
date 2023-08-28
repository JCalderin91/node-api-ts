import { Athlete } from "./../interfaces/athlete";
import { AirtableService } from "../services/airtable";

export class AthleteModel {
  static getAll(){
    return AirtableService.getAll<Athlete>({ table: "students" });
  }
  static getOne(id: string) {
    return AirtableService.getOne<Athlete>({ id, table: "students" });
  }
  static create(fields: Athlete[]){
    return AirtableService.create<Athlete>({ fields, table: "students" });
  }
  static update(payload: { id: string; fields: Athlete }) {
    return AirtableService.put<Athlete>({ payload, table: "students" })
  }
  static delete(id: string) {
    return AirtableService.delete({ id, table: "students" });
  }
}
