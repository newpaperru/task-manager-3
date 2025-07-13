import { useState, useEffect } from "react";
import { ButtonCreate } from "../MaterialUI/ButtonCreate";
import styles from "./Home.module.css";
import type { Task } from "../Types/types";
import { Table } from "./Table/Table";
import { ModalWindow } from "./ModalWindow/ModalWindow";

import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchTasks = () => {
        fetch("http://localhost:3000/tasks")
            .then((res) => res.json())
            .then(setTasks)
            .catch(console.error);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = (id: string) => {
        fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" })
            .then(() => setTasks(tasks.filter((task) => task.id !== id)))
            .catch(console.error);
    };

    const handleTaskAdded = () => {
        fetchTasks();
        setIsModalOpen(false);
    };

    const handleEdit = (id: string) => {
        navigate(`/task/${id}`);
    };

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
                        <Table
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
