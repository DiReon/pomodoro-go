import React from 'react';
import styles from './tasktimerheader.module.css';
import {ITask} from '../../../interfaces/task.interface';
import {ETaskState} from '../TaskTimer';

interface ITaskTimerHeaderProps {
  task: ITask;
  currentPomodoro: number;
  taskState: string;
}

export function TaskTimerHeader({task, currentPomodoro, taskState}: ITaskTimerHeaderProps) {

  function getTimerStyle(): string {
    switch (taskState) {
      case ETaskState.WORK:
        return `${styles.redHeader}`;
      case ETaskState.BREAK:
        return `${styles.greenHeader}`;
      default:
        return '';
    }
  }
  return (
    <header>
        <div
          className={`${styles.taskTimerHeader} ${getTimerStyle()}`}>
          {task && (
            <>
              <span>{task.name}</span>
              <span>Помидор {currentPomodoro}</span>
            </>
          )}
        </div>
    </header>
  );
}
