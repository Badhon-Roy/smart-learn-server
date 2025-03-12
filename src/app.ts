import express, { Request, Response } from 'express';
import cors from "cors"
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

app.use(express.json());
app.use(cors())

//* application related api
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('👋😊 Welcome to my online course management system 🚀');
});

//*global error handler
app.use(globalErrorHandler)

export default app;