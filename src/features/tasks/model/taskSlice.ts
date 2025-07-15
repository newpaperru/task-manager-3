import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task, FormData } from "@shared/types/types";
import { v4 as uuidv4 } from "uuid";

/**
 * Состояние задач в Redux store
 * @property {Task[]} tasks - Список задач
 * @property {boolean} loading - Флаг загрузки
 * @property {string | null} error - Ошибка при загрузке
 */
interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        /**
         * Начало загрузки задач
         * @param {TasksState} state - Текущее состояние
         */
        fetchTasksStart(state) {
            state.loading = true;
            state.error = null;
        },

        /**
         * Успешная загрузка задач
         * @param {TasksState} state - Текущее состояние
         * @param {PayloadAction<Task[]>} action - Действие с массивом задач
         */
        fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
        },

        /**
         * Ошибка при загрузке задач
         * @param {TasksState} state - Текущее состояние
         * @param {PayloadAction<string>} action - Действие с текстом ошибки
         */
        fetchTasksFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        /**
         * Создание новой задачи
         * @param {TasksState} state - Текущее состояние
         * @param {PayloadAction<FormData>} action - Действие с данными формы
         */
        createTask(state, action: PayloadAction<FormData>) {
            const newTask: Task = {
                id: uuidv4(),
                ...action.payload,
                dateCreate: new Date().toISOString(),
            };
            state.tasks.push(newTask);
        },

        /**
         * Обновление существующей задачи
         * @param {TasksState} state - Текущее состояние
         * @param {PayloadAction<{id: string, data: FormData}>} action - Действие с ID и новыми данными задачи
         */
        updateTask(
            state,
            action: PayloadAction<{ id: string; data: FormData }>
        ) {
            const { id, data } = action.payload;
            const index = state.tasks.findIndex((task) => task.id === id);
            if (index !== -1) {
                state.tasks[index] = {
                    ...state.tasks[index],
                    ...data,
                    id,
                };
            }
        },

        /**
         * Удаление задачи
         * @param {TasksState} state - Текущее состояние
         * @param {PayloadAction<string>} action - Действие с ID задачи для удаления
         */
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
    },
});

export const {
    fetchTasksStart,
    fetchTasksSuccess,
    fetchTasksFailure,
    createTask,
    updateTask,
    deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;
