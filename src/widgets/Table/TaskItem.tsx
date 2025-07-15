import React from "react";
import styles from "./Task.module.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { TableProps } from "@shared/types/types";
import { TaskChips } from "@/shared/ui/MaterialUI/TaskChips";

import { format } from "date-fns";

import TruncateMarkup from "react-truncate-markup";

/**
 * Пропсы для элемента задачи
 * @extends TableProps
 * @property {Task} task - Конкретная задача для отображения
 */
interface TaskItemProps extends TableProps {
    task: TableProps["tasks"][0];
}

export const TaskItem = React.memo(
    ({ task, onEdit, onDelete }: TaskItemProps) => {
        const formattedDate = format(new Date(task.dateCreate), "dd.MM.yyyy");

        return (
            <div className={styles.cell}>
                <div className={styles.bookmark3d}>
                    <div className={styles.bookmark3d_front}>
                        {formattedDate}
                    </div>
                </div>

                <div className={styles.wrap}>
                    <div className={styles.text_wrap}>
                        <TruncateMarkup lines={1}>
                            <span className={styles.title}>{task.title}</span>
                        </TruncateMarkup>
                        <TruncateMarkup lines={1}>
                            <p className={styles.desc} title={task.description}>
                                {task.description}
                            </p>
                        </TruncateMarkup>
                    </div>

                    <div className={styles.btns}>
                        <button
                            onClick={() => onEdit(task.id)}
                            className={styles.editButton}
                        >
                            <EditIcon />
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className={styles.deleteButton}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
                <TaskChips
                    category={task.category}
                    priority={task.priority}
                    status={task.status}
                />
            </div>
        );
    }
);
