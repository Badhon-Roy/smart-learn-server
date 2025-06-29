import express, { Application, Request, Response } from 'express';
import cors from "cors"



import cookieParser from "cookie-parser"
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app : Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

//* application related api
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('👋😊 Welcome to my online course management system 🚀');
});

//*global error handler
app.use(globalErrorHandler)

export default app;