export interface INotes {
    title: string;
    content: string;
    category: 'Personal' | 'Work' | 'Study' | 'Others';
    pinned: boolean;
    tags: {
        label: string;
        color: string;
    };
}
