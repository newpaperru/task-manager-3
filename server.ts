import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import type { Task, FormData } from '@shared/types/types';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Хранилище задач в памяти
let tasks: Task[] = [
    {
        id: '1',
        title: 'Пример задачи',
        description: 'Это пример задачи',
        category: 'Feature',
        status: 'To Do',
        priority: 'Medium',
        dateCreate: new Date().toISOString()
    }
];

// Получение всех задач
app.get('/tasks', (req, res) => {
    const { title, date } = req.query;
    
    let filteredTasks = [...tasks];
    
    // Фильтрация по названию
    if (typeof title === 'string') {
        filteredTasks = filteredTasks.filter(task => 
            task.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    
    // Фильтрация по дате
    if (typeof date === 'string') {
        filteredTasks = filteredTasks.filter(task => 
            new Date(task.dateCreate).toISOString().split('T')[0] === date
        );
    }
    
    res.json(filteredTasks);
});

// Получение задачи по ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Задача не найдена' });
    }
});

// Создание новой задачи
app.post('/tasks', (req, res) => {
    const taskData: FormData = req.body;
    const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        dateCreate: new Date().toISOString()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Обновление задачи
app.patch('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskData: Partial<FormData> = req.body;
    
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Задача не найдена' });
    }
    
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...taskData
    };
    
    res.json(tasks[taskIndex]);
});

// Удаление задачи
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});