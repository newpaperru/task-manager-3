import type { FormFieldConfig } from "../Types/types";

export const steps = [
    "Напишите заголовок",
    "Напишите описание",
    "Выберите теги",
];
export const categories = [
    "Bug",
    "Feature",
    "Documentation",
    "Refactor",
    "Test",
];
export const statuses = ["To Do", "In Progress", "Done"];
export const priorities = ["Low", "Medium", "High"];

export const formFields: FormFieldConfig[] = [
    {
        label: "Категория",
        name: "category",
        options: categories,
    },
    {
        label: "Статус",
        name: "status",
        options: statuses,
    },
    {
        label: "Приоритет",
        name: "priority",
        options: priorities,
    },
];
