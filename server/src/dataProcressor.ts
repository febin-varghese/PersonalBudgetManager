import { createReadStream } from 'fs';
import { resolve } from 'path';
import { parse } from 'fast-csv';

export async function readDataFromCSV(filePath: string) {
  const fullPath = resolve(__dirname, '../../data/', `${filePath}.csv`);

  createReadStream(fullPath)
    .pipe(parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', (row) => console.log(row))
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
}
