import express, {Request, Response} from 'express';
import {Note} from '../models/notes.model';

export const notesRouter = express.Router();
notesRouter.get('', async (req: Request, res: Response) => {
    const notes = await Note.find();
    res.status(200).json(notes);
});

notesRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const note = await Note.findById(id);
    res.status(200).json(note);
});

notesRouter.post('/create-note', async (req: Request, res: Response) => {
    const myNote = new Note({
        title: 'Learning Nextjs',
    });
    await myNote.save();

    res.status(201).json({
        success: true,
        message: 'Note created successfully',
        note: myNote,
    });
});
notesRouter.post('/create-note-2', async (req: Request, res: Response) => {
    const body = req.body;
    const note = await Note.create(body);
    res.status(201).json({
        success: true,
        message: 'Note created successfully',
        note,
    });
});
notesRouter.patch('/update-note/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const note = await Note.findByIdAndUpdate(id, body);
    res.status(201).json({
        success: true,
        message: 'Note updated successfully',
        note,
    });
});
notesRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: 'Note deleted successfully',
        note: deletedNote,
    });
});
