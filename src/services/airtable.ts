var Airtable = require("airtable");
var base = new Airtable({
  apiKey:
    "pat65psXM2GCuo7Iq.089eb19a0aaa5c6642bf07e6e4646e092cf3f5616a9c1aaff22603f48591d1fd",
}).base("app9RRnQpCXoxhcAa");

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
          const response: any[] = records.map(
            ({ fields }: { fields: any }) => fields
          );
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
