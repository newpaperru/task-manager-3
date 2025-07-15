/**
 * Тип, описывающий задачу
 * @property {string} id - Уникальный идентификатор
 * @property {string} title - Заголовок задачи
 * @property {string} description - Описание задачи
 * @property {string} category - Категория задачи
 * @property {string} status - Статус выполнения
 * @property {string} priority - Приоритет задачи
 * @property {string} dateCreate - Дата создания в ISO формате через библиотеку date-fns
 */
export type Task = {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    priority: string;
    dateCreate: string;
};

/**
 * Тип для данных формы (исключает id и dateCreate из Task)
 */
export type FormData = Omit<Task, "id" | "dateCreate">;

/**
 * Пропсы для компонента чипсов задачи
 * @property {string} category - Категория задачи
 * @property {string} priority - Приоритет задачи
 * @property {string} status - Статус задачи
 */
export type TaskChipsProps = Pick<Task, "category" | "priority" | "status">;

/**
 * Конфигурация поля формы
 * @property {string} label - Подпись поля
 * @property {keyof FormData} name - Имя поля (совпадает с FormData)
 * @property {string[]} options - Доступные варианты для выбора
 */
export type FormFieldConfig = {
    label: string;
    name: keyof FormData;
    options: string[];
};

/**
 * Пропсы для модального окна
 * @property {boolean} open - Флаг видимости окна
 * @property {() => void} onClose - Колбек при закрытии
 * @property {() => void} onTaskAdded - Колбек при добавлении задачи
 */
export type ModalWindowProps = {
    open: boolean;
    onClose: () => void;
    onTaskAdded: () => void;
};

/**
 * Пропсы для таблицы задач
 * @property {Task[]} tasks - Массив задач для отображения
 * @property {(id: string) => void} onEdit - Колбек редактирования задачи
 * @property {(id: string) => void} onDelete - Колбек удаления задачи
 */
export type TableProps = {
    tasks: Task[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};
