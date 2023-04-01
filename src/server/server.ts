import express, { Express, Request, Response } from 'express';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8000;

app.get('/', (req: Request, res: Response) => {
  const rootFilePath = join(__dirname, '../index.html');
  res.sendFile(rootFilePath);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
