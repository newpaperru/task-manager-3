import type { AppDispatch, RootState } from "@app/store";
import {
    fetchTasksStart,
    fetchTasksSuccess,
    fetchTasksFailure,
    createTask,
    updateTask,
    deleteTask,
} from "./taskSlice";
import type { FormData } from "@shared/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@/features/tasks/api/API_URL";

/**
 * Получает список задач с сервера и обновляет состояние Redux
 * @async
 * @function
 * @param {void} - Не принимает параметров
 * @returns {Promise<void>}
 * @throws {Error} При ошибке сети или неверном ответе сервера
 */
export const fetchTasks = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchTasksStart());
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Запрос не удался');
        const data = await response.json();
        dispatch(fetchTasksSuccess(data));
    } catch (error) {
        dispatch(
            fetchTasksFailure(
                error instanceof Error ? error.message : "Неизвестная ошибка"
            )
        );
    }
};

/**
 * Создает новую задачу на сервере и обновляет состояние Redux
 * @async
 * @function
 * @param {FormData} taskData - Данные для создания задачи
 * @param {Object} thunkAPI - Объект Redux Thunk API
 * @param {AppDispatch} thunkAPI.dispatch - Функция dispatch Redux
 * @param {Function} thunkAPI.rejectWithValue - Функция для отклонения с значением
 * @returns {Promise<Object>} Созданная задача
 * @throws {Error} При ошибке сети или неверном ответе сервера
 */
export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (taskData: FormData, { dispatch, rejectWithValue }) => {
        try {
            const newTask = {
                ...taskData,
                dateCreate: new Date().toISOString(),
            };

            dispatch(createTask(newTask));

            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) throw new Error("Ошибка сети");
            return await response.json();
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Неизвестная ошибка"
            );
        }
    }
);

/**
 * Редактирует существующую задачу на сервере и обновляет состояние Redux
 * @async
 * @function
 * @param {Object} params - Параметры редактирования
 * @param {string} params.id - ID редактируемой задачи
 * @param {FormData} params.data - Новые данные задачи
 * @param {Object} thunkAPI - Объект Redux Thunk API
 * @param {Function} thunkAPI.getState - Функция получения текущего состояния
 * @param {AppDispatch} thunkAPI.dispatch - Функция dispatch Redux
 * @param {Function} thunkAPI.rejectWithValue - Функция для отклонения с значением
 * @returns {Promise<Object>} Обновленная задача
 * @throws {Error} При ошибке сети, неверном ответе сервера или если задача не найдена
 */
export const editTask = createAsyncThunk(
    "tasks/editTask",
    async (
        { id, data }: { id: string; data: FormData },
        { dispatch, getState, rejectWithValue }
    ) => {
        try {
            const state = getState() as RootState;
            const existingTask = state.tasks.tasks.find(
                (task) => task.id === id
            );

            if (!existingTask) {
                throw new Error("Задача не найдена");
            }

            dispatch(updateTask({ id, data }));

            const response = await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...existingTask,
                    ...data,
                    id,
                }),
            });

            if (!response.ok) throw new Error("Ошибка сети");
            return await response.json();
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Неизвестная ошибка"
            );
        }
    }
);

/**
 * Удаляет задачу с сервера и обновляет состояние Redux
 * @async
 * @function
 * @param {string} id - ID удаляемой задачи
 * @returns {Promise<void>}
 * @throws {Error} При ошибке сети или неверном ответе сервера
 */
export const removeTask = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: "DELETE" 
        });
        if (!response.ok) throw new Error('Ошибка при удалении задачи');
        dispatch(deleteTask(id));
    } catch (error) {
        console.error("Ошибка при редактировании задачи:", error);
        throw error;
    }
};