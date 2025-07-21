"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    category: {
        type: String,
        enum: ['Personal', 'Work', 'Study', 'Others'],
        default: 'Personal',
    },
    pinned: { type: Boolean, default: false },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: 'Grey' },
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, { versionKey: false, timestamps: true });
exports.Note = (0, mongoose_1.model)('Note', noteSchema);
