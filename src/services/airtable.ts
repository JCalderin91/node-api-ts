import { removeFinishWith } from "../helpers/objectTools";

require("dotenv").config();
var Airtable = require("airtable");
var base = new Airtable({
  apiKey: process.env.AIRTABLE_APIKEY,
}).base(process.env.AIRTABLE_BASE);

interface AirtableServiceInterface {
  getAll<T>({ table }: { table: string }): Promise<T[]>;
  getOne<T>({ id, table }: { id: string; table: string }): Promise<T>;
  create<T>({ fields, table }: { fields: T[]; table: string }): Promise<T[]>;
  put<T>({ payload, table }: { payload: any; table: string }): Promise<T>;
  delete({ id, table }: { id: string; table: string }): Promise<Record<string, string>>;
}

export const AirtableService: AirtableServiceInterface = {
  getAll: <T>({ table }: { table: string }): Promise<T[]> => {
    const applicants = base(table);
    const all = applicants.select({
      view: "Grid view",
    });
    return new Promise((resolve, reject) => {
      try {
        all.firstPage((err: any, records: any[]) => {
          if (err || !records) reject(err);
          const response: any[] = records.map((record: any) => {
            return removeFinishWith(
              {
                id: record._rawJson.id,
                ...record._rawJson.fields,
                createdTime: record._rawJson.createdTime,
              },
              "_id"
            );
          });
          resolve(response as T[]);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getOne: <T>({ id, table }: { id: string; table: string }): Promise<T> => {
    return new Promise((resolve, reject) => {
      try {
        base(table).find(id, (err: any, record: any) => {
          if (err || !record) return reject(err);
          const response = removeFinishWith(
            {
              id: record._rawJson.id,
              ...record._rawJson.fields,
              createdTime: record._rawJson.createdTime,
            },
            "_id"
          );
          resolve(response as T);
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
          if (err || !record) return reject(err);
          const response = removeFinishWith(
            {
              id: record._rawJson.id,
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
  put: <T>({ payload, table }: { payload: T; table: string }) => {
    return new Promise((resolve, reject) => {
      try {
        base(table).update([payload], (err: any, records: any) => {
          if (err || !records) return reject(err);
          const response: any[] = records.map((record: any) => {
            return removeFinishWith(
              {
                id: record._rawJson.id,
                ...record._rawJson.fields,
                createdTime: record._rawJson.createdTime,
              },
              "_id"
            );
          });
          resolve(response as any);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  delete: ({ id, table }: { id: string; table: string }) => {
    return new Promise((resolve, reject) => {
      try {
        base(table).destroy([id], (err: any, records: any) => {
          if (err || !records) return reject(err);
          resolve({deletedRecordId: id});
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
