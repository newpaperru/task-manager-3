import React from "react";
import styles from "./Task.module.css";
import { TaskItem } from "./TaskItem";
import type { TableProps } from "@shared/types/types";

export const TaskList = React.memo(
    ({ tasks = [], onEdit, onDelete }: TableProps) => {
        return (
            <div className={styles.table}>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        tasks={[]}
                    />
                ))}
            </div>
        );
    }
);
