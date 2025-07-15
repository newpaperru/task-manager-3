import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    TextareaAutosize,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Typography,
} from "@mui/material";
import type { FormData, Task } from "@shared/types/types";
import { formFields } from "@shared/constants/constants";

export const TaskForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<FormData>({
        title: "",
        description: "",
        category: "",
        status: "",
        priority: "",
    });

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/tasks/${id}`)
                .then((res) => res.json())
                .then(({ ...formData }: Task) => {
                    setTask(formData);
                })
                .catch(console.error);
        }
    }, [id]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: keyof FormData, value: string) => {
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!id) return;

        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        })
            .then(() => navigate("/"))
            .catch(console.error);
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Редактирование задачи
            </Typography>

            <TextField
                fullWidth
                label="Заголовок задачи"
                name="title"
                value={task.title}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            />

            <TextareaAutosize
                minRows={5}
                style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    marginBottom: "16px",
                }}
                placeholder="Описание задачи"
                name="description"
                value={task.description}
                onChange={handleInputChange}
            />

            <Box
                sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}
            >
                {formFields.map(({ label, name, options }) => (
                    <FormControl fullWidth key={name}>
                        <InputLabel>{label}</InputLabel>
                        <Select
                            value={task[name]}
                            onChange={(e) =>
                                handleSelectChange(name, e.target.value)
                            }
                            label={label}
                        >
                            {options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate("/")}>
                    Отмена
                </Button>
                <Button variant="contained" onClick={handleSave}>
                    Сохранить
                </Button>
            </Box>
        </Box>
    );
};
