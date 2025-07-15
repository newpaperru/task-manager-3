import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { addTask } from "@/features/tasks/model/taskThunks";
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Typography,
    TextField,
    TextareaAutosize,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Modal,
    Button,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import type { FormData, ModalWindowProps } from "@shared/types/types";
import { formFields, steps } from "@shared/constants/constants";

/**
 * Модальное окно для создания новой задачи с пошаговым процессом
 *
 * @component
 * @param {ModalWindowProps} props - Пропсы компонента
 * @param {boolean} props.open - Флаг открытия модального окна
 * @param {() => void} props.onClose - Функция закрытия модального окна
 * @param {() => void} props.onTaskAdded - Колбек после успешного добавления задачи
 *
 * @example
 * <ModalWindow
 *   open={isModalOpen}
 *   onClose={handleCloseModal}
 *   onTaskAdded={refreshTaskList}
 * />
 *
 * @description
 * Компонент предоставляет:
 * - Пошаговый процесс создания задачи (stepper из MUI)
 * - Адаптивный интерфейс для мобильных устройств
 */
export const ModalWindow = ({
    open,
    onClose,
    onTaskAdded,
}: ModalWindowProps) => {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        category: "",
        status: "",
        priority: "",
    });

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? "90%" : 600,
        maxHeight: isMobile ? "90vh" : "auto",
        overflowY: "auto",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: isMobile ? 2 : 4,
        borderRadius: 2,
    };

    /**
     * Проверяет, является ли шаг опциональным
     * @param {number} step - Номер шага
     * @returns {boolean} true если шаг опциональный
     */
    const isStepOptional = (step: number): boolean => step === 1;

    /**
     * Переход к следующему шагу
     */
    const handleNext = () => setActiveStep((prev) => prev + 1);

    /**
     * Возврат к предыдущему шагу
     */
    const handleBack = () => setActiveStep((prev) => prev - 1);

    /**
     * Обработчик изменения текстовых полей
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Событие изменения
     */
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Обработчик изменения выпадающих списков
     * @param {keyof FormData} name - Имя поля
     * @param {string} value - Новое значение
     */
    const handleSelectChange = (name: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Отправка формы и сохранение задачи
     */
    const handleSubmit = () => {
        dispatch(addTask(formData))
            .then(() => {
                onTaskAdded();
                onClose();
                setFormData({
                    title: "",
                    description: "",
                    category: "",
                    status: "",
                    priority: "",
                });
                setActiveStep(0);
            })
            .catch(console.error);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Stepper
                    activeStep={activeStep}
                    orientation={isMobile ? "vertical" : "horizontal"}
                    sx={{
                        flexWrap: "wrap",
                        gap: 1,
                        "& .MuiStepLabel-label": {
                            fontSize: isMobile ? "0.8rem" : "0.875rem",
                        },
                    }}
                >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                optional={
                                    isStepOptional(index) && (
                                        <Typography variant="caption">
                                            Опционально
                                        </Typography>
                                    )
                                }
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === steps.length ? (
                    <>
                        <Typography
                            sx={{
                                mt: 2,
                                mb: 1,
                                fontSize: isMobile ? "1rem" : "1.125rem",
                            }}
                        >
                            Задача успешно создана!
                        </Typography>
                        <Box sx={{ display: "flex", pt: 2 }}>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={onClose}>Закрыть</Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box
                            sx={{
                                mt: 2,
                                mb: 3,
                                "& .MuiFormControl-root": {
                                    mt: isMobile ? 1 : 2,
                                },
                            }}
                        >
                            {activeStep === 0 && (
                                <TextField
                                    fullWidth
                                    size={isMobile ? "small" : "medium"}
                                    label="Заголовок задачи"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            )}

                            {activeStep === 1 && (
                                <TextareaAutosize
                                    minRows={isMobile ? 3 : 5}
                                    maxRows={8}
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid rgba(0, 0, 0, 0.23)",
                                        fontFamily: "inherit",
                                        fontSize: isMobile ? "14px" : "inherit",
                                    }}
                                    placeholder="Описание задачи"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            )}

                            {activeStep === 2 && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: isMobile ? 2 : 3,
                                    }}
                                >
                                    {formFields.map(
                                        ({ label, name, options }) => (
                                            <FormControl fullWidth key={name}>
                                                <InputLabel>{label}</InputLabel>
                                                <Select
                                                    value={formData[name]}
                                                    onChange={(e) =>
                                                        handleSelectChange(
                                                            name,
                                                            e.target.value
                                                        )
                                                    }
                                                    label={label}
                                                    required
                                                >
                                                    {options.map((option) => (
                                                        <MenuItem
                                                            key={option}
                                                            value={option}
                                                            sx={{
                                                                py: isMobile
                                                                    ? 1
                                                                    : 1.5,
                                                                fontSize:
                                                                    isMobile
                                                                        ? "0.875rem"
                                                                        : "1rem",
                                                            }}
                                                        >
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )
                                    )}
                                </Box>
                            )}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                pt: 2,
                                flexDirection: isMobile
                                    ? "column-reverse"
                                    : "row",
                                gap: isMobile ? 1 : 0,
                            }}
                        >
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{
                                    mr: isMobile ? 0 : 1,
                                    width: isMobile ? "100%" : "auto",
                                    mb: isMobile ? 1 : 0,
                                }}
                            >
                                Назад
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(activeStep) && (
                                <Button
                                    color="inherit"
                                    onClick={handleNext}
                                    sx={{
                                        mr: isMobile ? 0 : 1,
                                        width: isMobile ? "100%" : "auto",
                                        mb: isMobile ? 1 : 0,
                                    }}
                                >
                                    Пропустить
                                </Button>
                            )}
                            <Button
                                onClick={
                                    activeStep === steps.length - 1
                                        ? handleSubmit
                                        : handleNext
                                }
                                sx={{ width: isMobile ? "100%" : "auto" }}
                            >
                                {activeStep === steps.length - 1
                                    ? "Добавить задачу"
                                    : "Далее"}
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
};
