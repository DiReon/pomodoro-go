import React from 'react';
import styles from './tasktimerheader.module.css';
import {ITask} from '../../../interfaces/task.interface';

interface ITaskTimerHeaderProps {
  task: ITask;
  currentPomo: number;
  isBreakPeriod: boolean;
}

export function TaskTimerHeader({task, currentPomo, isBreakPeriod}: ITaskTimerHeaderProps) {

  return (
    <header>
      {task && (
        <div className={`${styles.taskTimerHeader} ${isBreakPeriod ? styles.greenHeader : styles.redHeader}`}>
          <span>{task.name}</span>
          <span>Помидор {currentPomo}</span>
        </div>
      )}
    </header>

  );
}
