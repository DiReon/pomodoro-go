import React from 'react';
import styles from './tasktimerheader.module.css';
import {ITask} from "../../../interfaces/task.interface";

interface ITaskTiimerHeaderProps {
  task: ITask;
  currentPomo: number;
}

export function TaskTimerHeader({task, currentPomo}: ITaskTiimerHeaderProps) {

  return (
    <header>
      {task && (
        <div className={styles.taskTimerHeader}>
          <span>{task.name}</span>
          <span>Помидор {currentPomo}</span>
        </div>
      )}
    </header>

  );
}
