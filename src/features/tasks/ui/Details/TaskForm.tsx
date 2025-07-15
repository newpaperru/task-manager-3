import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@app/store";
import { editTask, fetchTasks } from "@/features/tasks/model/taskThunks";
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
import { API_URL } from "@/features/tasks/api/API_URL";

export const TaskForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const taskFromStore = useSelector((state: RootState) =>
        state.tasks.tasks.find((task) => task.id === id)
    );

    const [formData, setFormData] = useState<FormData>({
        title: taskFromStore?.title || "",
        description: taskFromStore?.description || "",
        category: taskFromStore?.category || "",
        status: taskFromStore?.status || "",
        priority: taskFromStore?.priority || "",
    });

    useEffect(() => {
        if (id && !taskFromStore) {
            fetch(`${API_URL}/${id}`)
                .then((res) => res.json())
                .then((task: Task) => {
                    setFormData({
                        title: task.title,
                        description: task.description,
                        category: task.category,
                        status: task.status,
                        priority: task.priority,
                    });
                })
                .catch(console.error);
        }
    }, [id, taskFromStore]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: keyof FormData, value: string) => {
        setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!id) return;

        try {
            await dispatch(editTask({ id, data: formData }));
            await dispatch(fetchTasks());
            navigate("/");
        } catch (error) {
            console.error("Failed to save task:", error);
        }
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
                value={formData.title}
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
                value={formData.description}
                onChange={handleInputChange}
            />

            <Box
                sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}
            >
                {formFields.map(({ label, name, options }) => (
                    <FormControl fullWidth key={name}>
                        <InputLabel>{label}</InputLabel>
                        <Select
                            value={formData[name]}
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
