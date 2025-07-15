import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "@features/tasks/model/taskSlice";

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
});

/**
 * Тип корневого состояния Redux
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип dispatch Redux
 */
export type AppDispatch = typeof store.dispatch;
