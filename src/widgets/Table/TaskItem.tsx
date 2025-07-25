import React, { useState } from "react";
import styles from "./Task.module.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { TableProps } from "@shared/types/types";
import { TaskChips } from "@/shared/ui/MaterialUI/TaskChips";

import { format } from "date-fns";

import TruncateMarkup from "react-truncate-markup";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

/**
 * Пропсы для элемента задачи
 * @extends TableProps
 * @property {Task} task - Конкретная задача для отображения
 */
interface TaskItemProps extends TableProps {
    task: TableProps["tasks"][0];
}

export const TaskItem = ({ task, onEdit, onDelete }: TaskItemProps) => {
    const formattedDate = format(new Date(task.dateCreate), "dd.MM.yyyy");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirmDelete = () => {
        onDelete(task.id);
        handleClose();
    };

    return (
        <div className={styles.cell}>
            <div className={styles.bookmark3d}>
                <div className={styles.bookmark3d_front}>{formattedDate}</div>
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
                        onClick={handleOpen}
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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Удалить задачу "{task.title}"?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
