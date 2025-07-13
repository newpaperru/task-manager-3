import styles from "./Table.module.css";
import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import LensIcon from "@mui/icons-material/Lens";

import { TaskDate } from "../Home__elements/TaskDate";
import type { TableProps } from "../../Types/types";

export const Table = ({ tasks = [], onEdit, onDelete }: TableProps) => {
    return (
        <div className={styles.table}>
            {tasks.map((task) => (
                <React.Fragment key={task.id}>
                    <div className={styles.cell}>
                        <div className={styles.text_wrap}>
                            <span className={styles.title}>{task.title}</span>
                            <p className={styles.desc} title={task.description}>{task.description}</p>
                        </div>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                "@media (max-width: 802px)": {
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    "& > .MuiChip-root + .MuiChip-root": {
                                        marginLeft: 0,
                                    },
                                },
                            }}
                        >
                            <Chip
                                icon={
                                    <LensIcon
                                        style={{
                                            color: "var(--color-red_800)",
                                        }}
                                        sx={{
                                            "@media (max-width: 802px)": {
                                                width: "16px",
                                            },
                                        }}
                                    />
                                }
                                label={task.category}
                                variant="outlined"
                                sx={{
                                    fontSize: "16px",
                                    "@media (max-width: 802px)": {
                                        fontSize: "12px",
                                        height: "100%",
                                        lineHeight: "1",
                                    },
                                }}
                            />
                            <Chip
                                icon={
                                    <LensIcon
                                        style={{
                                            color: "var(--color-salsa_habanero)",
                                        }}
                                        sx={{
                                            "@media (max-width: 802px)": {
                                                width: "16px",
                                            },
                                        }}
                                    />
                                }
                                label={task.priority}
                                variant="outlined"
                                sx={{
                                    fontSize: "16px",
                                    "@media (max-width: 802px)": {
                                        fontSize: "12px",
                                        height: "100%",
                                        lineHeight: "1",
                                    },
                                }}
                            />
                            <Chip
                                icon={
                                    <LensIcon
                                        style={{
                                            color: "var(--color-sea_green)",
                                        }}
                                        sx={{
                                            "@media (max-width: 802px)": {
                                                width: "16px",
                                            },
                                        }}
                                    />
                                }
                                label={task.status}
                                variant="outlined"
                                sx={{
                                    fontSize: "16px",
                                    "@media (max-width: 802px)": {
                                        fontSize: "12px",
                                        height: "100%",
                                        lineHeight: "1",
                                    },
                                }}
                            />
                        </Stack>
                    </div>

                    <div className={styles.actions}>
                        <TaskDate dateCreate={task.dateCreate} />
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
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};
