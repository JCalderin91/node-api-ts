require("dotenv").config();
var Airtable = require("airtable");
var base = new Airtable({
  apiKey: process.env.AIRTABLE_APIKEY,
}).base(process.env.AIRTABLE_BASE);

interface AirtableServiceInterface {
  getAll<T>({ table }: { table: string }): Promise<T[]>;
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
            return {
              uuid: record._rawJson.id,
              ...record._rawJson.fields,
              createdTime: record._rawJson.createdTime,
            };
          });
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
