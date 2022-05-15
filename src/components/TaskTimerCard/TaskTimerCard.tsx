import React from 'react';
import styles from './tasktimercard.module.css';
import {ITask} from "../../interfaces/task.interface";

export function TaskTimerCard({task}: {task: ITask}) {
  return (
    <div>
      <div className={styles.remainingTime}>25:00</div>
      {task && (<div>Задача 1: {task.name}</div>)}
      <div className={styles.actionButtons}>
        <button className={styles.btnSuccess}>Старт</button>
        <button className={styles.btnWarning}>Стоп</button>
      </div>
    </div>
  );
}
