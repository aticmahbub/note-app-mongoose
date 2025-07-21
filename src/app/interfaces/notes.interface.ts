import {Types} from 'mongoose';

export interface INotes {
    title: string;
    content: string;
    category: 'Personal' | 'Work' | 'Study' | 'Others';
    pinned: boolean;
    tags: {
        label: string;
        color: string;
    };
    user: Types.ObjectId;
}
