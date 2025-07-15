export type Task = {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    priority: string;
    dateCreate: string;
};

export type FormData = Omit<Task, "id" | "dateCreate">;

export type FormFieldConfig = {
    label: string;
    name: keyof FormData;
    options: string[];
};

export type ModalWindowProps = {
    open: boolean;
    onClose: () => void;
    onTaskAdded: () => void;
};

export type TableProps = {
    tasks: Task[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};
