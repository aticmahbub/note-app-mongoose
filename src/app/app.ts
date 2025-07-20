import express, {Application, Request, Response} from 'express';
import {model, Schema} from 'mongoose';
import {Note} from './models/notes.model';
import {notesRouter} from './controllers/notes.controller';
const app: Application = express();
app.use(express.json());
app.use('/notes', notesRouter);
app.get('/', (req: Request, res: Response) => {
    res.send('Server is up and running');
});

export default app;
