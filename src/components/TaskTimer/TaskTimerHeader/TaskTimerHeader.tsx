import React from 'react';
import './tasktimerheader.css';
import {ITask} from "../../../interfaces/task.interface";

interface ITaskTiimerHeaderProps {
  task: ITask;
  currentPomo: number;
}

export function TaskTimerHeader({task, currentPomo}: ITaskTiimerHeaderProps) {

  return (
    <header>
      {task && (
        <div className={'task-timer-header'}>
          <span>{task.name}</span>
          <span>Помидор {currentPomo}</span>
        </div>
      )}
    </header>

  );
}
