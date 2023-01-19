import express from 'express';
import cors from 'cors';
import userRouter from './routes/users/user.router.js';
import registerRouter from './routes/registers/register.router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', userRouter);
app.use('/', registerRouter);

export default app;
