import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1d1d1d",
        },
    },
});

/**
 * Пропсы для кнопки создания
 * @property {() => void} onClick - Колбек при клике
 */
interface ButtonCreateProps {
    onClick: () => void;
}

export const ButtonCreate = ({ onClick }: ButtonCreateProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Button variant="outlined" size="large" onClick={onClick}>
                Добавить задачу
            </Button>
        </ThemeProvider>
    );
};
