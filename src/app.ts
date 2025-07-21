import express, {Application, Request, Response} from 'express';
import {model, Schema} from 'mongoose';
import { notesRouter } from './app/controllers/notes.controller';
import { usersRouter } from './app/controllers/user.controller';
const app: Application = express();
app.use(express.json());
app.use('/notes', notesRouter);
app.use('/users', usersRouter);
app.get('/', (req: Request, res: Response) => {
    res.send('Server is up and running');
});

export default app;
