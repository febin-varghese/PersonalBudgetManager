import { createReadStream } from 'fs';
import { resolve } from 'path';
import { parse } from 'fast-csv';
import { getDataPath } from './utilities/common';

export async function readDataFromCSV<T>(filePath: string): Promise<Array<T>> {
  // TODO: sample data
  const fullPath = resolve(__dirname, getDataPath(), `${filePath}.csv`);
  const data: T[] = [];
  const readStream = createReadStream(fullPath).pipe(
    parse({ headers: true, delimiter: ';' })
  );
  // https://stackoverflow.com/questions/33599688/how-to-use-es8-async-await-with-streams
  const readStreamPromise = new Promise(function (resolve, reject) {
    readStream.on('data', (row) => resolve(data.push(row)));
    readStream.on('error', reject);
    readStream.on('end', (rowCount: number) =>
      console.log(`Parsed ${rowCount} ${rowCount === 1 ? 'row' : 'rows'}`)
    );
  });
  await readStreamPromise;
  return data;
}
