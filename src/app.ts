import express, { Request, Response } from 'express';
import cors from "cors"
import router from './routes';

const app = express();

app.use(express.json());
app.use(cors())

//* application related api
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('👋😊 Welcome to my online course management system 🚀');
});

export default app;