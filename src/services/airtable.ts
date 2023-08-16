import { removeFinishWith } from "../helpers/objectTools";

require("dotenv").config();
var Airtable = require("airtable");
var base = new Airtable({
  apiKey: process.env.AIRTABLE_APIKEY,
}).base(process.env.AIRTABLE_BASE);

interface AirtableServiceInterface {
  getAll<T>({ table }: { table: string }): Promise<T[]>;
  getOne<T>({ uuid, table }: { uuid: string; table: string }): Promise<T>;
  create<T>({ fields, table }: { fields: T[]; table: string }): Promise<T[]>;
  //put<T>({ fields, table }: { fields: T[]; table: string }): Promise<T[]>;
  //delete<T>({ uuids, table }: { uuids: string[]; table: string }): Promise<T[]>;
}

export const AirtableService: AirtableServiceInterface = {
  getAll: <T>({ table }: { table: string }): Promise<T[]> => {
    const applicants = base(table);
    const all = applicants.select({
      view: "Grid view",
    });
    return new Promise((resolve, reject) => {
      try {
        all.firstPage((error: any, records: any[]) => {
          if (error) reject(error);
          const response: any[] = records.map((record: any) => {
            return removeFinishWith(
              {
                uuid: record._rawJson.id,
                ...record._rawJson.fields,
                createdTime: record._rawJson.createdTime,
              },
              "_id"
            );
          });
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getOne: <T>({ uuid, table }: { uuid: string; table: string }): Promise<T> => {
    return new Promise((resolve, reject) => {
      try {
        base(table).find(uuid, (err: any, record: any) => {
          if (err) return reject(err);
          const response = removeFinishWith(
            {
              uuid: record._rawJson.id,
              ...record._rawJson.fields,
              createdTime: record._rawJson.createdTime,
            },
            "_id"
          );
          resolve(response as any);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  create: <T>({ fields, table }: { fields: T[]; table: string }) => {
    return new Promise((resolve, reject) => {
      try {
        base(table).create(fields, (err: any, record: any) => {
          if (err) return reject(err);
          const response = removeFinishWith(
            {
              uuid: record._rawJson.id,
              ...record._rawJson.fields,
              createdTime: record._rawJson.createdTime,
            },
            "_id"
          );
          resolve(response as any);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
