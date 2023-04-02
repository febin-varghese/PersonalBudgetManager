import express, { Express, Request, Response } from 'express';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req: Request, res: Response) => {
  const rootFilePath = join(__dirname, '/index.html');
  res.sendFile(rootFilePath);
});

app.get('*', (req: Request, res: Response) => {
  const rootFilePath = join(__dirname, '/public/404.html');
  res.status(404).sendFile(rootFilePath);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
