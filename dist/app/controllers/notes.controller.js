"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
const express_1 = __importDefault(require("express"));
const notes_model_1 = require("../models/notes.model");
exports.notesRouter = express_1.default.Router();
exports.notesRouter.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_model_1.Note.find();
    res.status(200).json(notes);
}));
exports.notesRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const note = yield notes_model_1.Note.findById(id);
    res.status(200).json(note);
}));
exports.notesRouter.post('/create-note', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myNote = new notes_model_1.Note({
        title: 'Learning Nextjs',
    });
    yield myNote.save();
    res.status(201).json({
        success: true,
        message: 'Note created successfully',
        note: myNote,
    });
}));
exports.notesRouter.post('/create-note-2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const note = yield notes_model_1.Note.create(body);
    res.status(201).json({
        success: true,
        message: 'Note created successfully',
        note,
    });
}));
exports.notesRouter.patch('/update-note/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const note = yield notes_model_1.Note.findByIdAndUpdate(id, body);
    res.status(201).json({
        success: true,
        message: 'Note updated successfully',
        note,
    });
}));
exports.notesRouter.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deletedNote = yield notes_model_1.Note.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: 'Note deleted successfully',
        note: deletedNote,
    });
}));
