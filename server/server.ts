import express, { Express, Request, Response } from 'express';
import bodyparser from 'body-parser';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8000;

app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

// Data APIs
app.get('/api/v1/income', (req: Request, res: Response) => {
  res.json({
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    amount: [120, 190, 300, 500, 700, 900, 1000, 1100]
  });
});

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
