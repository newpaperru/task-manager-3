import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@app/store";
import { fetchTasks, removeTask } from "@/features/tasks/model/taskThunks";

import { ButtonCreate } from "@shared/ui/MaterialUI/ButtonCreate";
import { TaskList } from "@widgets/Table/TaskList";
import { ModalWindow } from "@widgets/ModalWindow/ModalWindow";

import styles from "./Home.module.css";

export const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector(
        (state: RootState) => state.tasks
    );

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(removeTask(id));
    };

    const handleTaskAdded = () => {
        setIsModalOpen(false);
        dispatch(fetchTasks());
    };

    const handleEdit = (id: string) => {
        navigate(`/task/${id}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.home}>
            <div className={styles.wrap}>
                <div className={styles.top_header}>
                    <div className={styles.greetings}>
                        <h1 className={styles.title}>
                            Приветствую Вас, Пользователь!
                        </h1>
                        <span className={styles.text}>
                            Какие задачи на сегодня?
                        </span>
                    </div>
                    <ButtonCreate onClick={() => setIsModalOpen(true)} />
                </div>

                <div className={styles.tasks}>
                    {tasks.length > 0 ? (
                        <TaskList
                            tasks={tasks}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ) : (
                        <p className={styles.empty}>Нет текущих задач :(</p>
                    )}
                </div>
            </div>

            <ModalWindow
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTaskAdded={handleTaskAdded}
            />
        </div>
    );
};
