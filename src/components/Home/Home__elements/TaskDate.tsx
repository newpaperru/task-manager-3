import { useEffect, useReducer } from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "../Table/Table.module.css";

export const TaskDate = ({ dateCreate }: { dateCreate: string }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        const interval = setInterval(forceUpdate, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className={styles.time}>
            Было добавлено&nbsp;
            {dateCreate
                ? formatDistanceToNow(new Date(dateCreate), {
                      addSuffix: true,
                      locale: ru,
                  })
                : "Дата не указана"}
        </span>
    );
};
