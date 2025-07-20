import {model, Schema} from 'mongoose';

const noteSchema = new Schema(
    {
        title: {type: String, required: true, trim: true},
        content: {type: String, default: ''},
        category: {
            type: String,
            enum: ['Personal', 'Work', 'Study', 'Others'],
            default: 'Personal',
        },
        pinned: {type: Boolean, default: false},
        tags: {
            label: {type: String, required: true},
            color: {type: String, default: 'Grey'},
        },
    },
    {versionKey: false, timestamps: true},
);

export const Note = model('Note', noteSchema);
