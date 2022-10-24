import { MainDbi } from './types.js';

interface MainDbiTableRows {
  teachers: {
    id: string;
    short: string;
  };

  subjects: {
    id: string;
    name: string;
    short: string;
  };

  classrooms: {
    id: string;
    short: string;
  };

  classes: {
    id: string;
    name: string;
    short: string;
  };

  periods: {
    id: string;
    name: string;
    starttime: string;
    endtime: string;
  };
}

type MainDbiTable<ID extends keyof MainDbiTableRows = keyof MainDbiTableRows> = ID extends any ? {
  id: ID;
  data_rows: MainDbiTableRows[ID][];
} : never;

interface MainDbiResponse {
  type: 'maindbi';
  dbid: string;
  tables: MainDbiTable[];
}

export function parseMainDbi(json: string): MainDbi {
  const body = JSON.parse(json);
  if (body === null || typeof body !== 'object') throw new Error('maindbi response should be an object');
  if (body.r === null || typeof body.r !== 'object') throw new Error('maindbi response should have a field "r"');
  if (body.r.type !== 'maindbi') throw new Error('"r.type" should be equal to "maindbi" in maindbi response');
  const response = body.r as MainDbiResponse;
  const result: MainDbi = {
    classes: {},
    classrooms: {},
    subjects: {},
    teachers: {},
    periods: {},
  };

  const mappers: {
    [ID in keyof MainDbiTableRows]: (row: MainDbiTableRows[ID]) => MainDbi[ID][string];
  } = {
    classes: (row) => ({
      name: row.name,
      short: row.short,
    }),
    teachers: (row) => ({
      name: row.short,
    }),
    classrooms: (row) => ({
      name: row.short,
    }),
    periods: (row) => ({
      name: row.name,
      startTime: row.starttime,
      endTime: row.endtime,
    }),
    subjects: (row) => ({
      name: row.name,
      short: row.short,
    }),
  };
  response.tables.forEach((table) => {
    const resultTable = result[table.id];
    const mapper = mappers[table.id];
    table.data_rows.forEach((row) => {
      resultTable[row.id] = mapper(row as any);
    });
  });

  return result;
}
