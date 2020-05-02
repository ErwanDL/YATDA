export type SubtaskType = {
    id: number;
    description: string;
    duration: number;
    completed: boolean;
};

export type TaskType = {
    id: number;
    title: string;
    subtasks: SubtaskType[];
};
