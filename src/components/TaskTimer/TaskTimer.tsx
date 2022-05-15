import React from 'react';
import './tasktimer.css';
import {TaskTimerHeader} from "./TaskTimerHeader";
import {ITask} from "../../interfaces/task.interface";
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react";
import {taskManager} from "../Tasks";

class ActiveTask {
  activeTask: ITask | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTask(task: ITask) {
    this.activeTask = task;
  }

}

// export const activeTask = new ActiveTask();

export const TaskTimer = observer(() => {
  // activeTask.setActiveTask(taskManager.tasks[0]);
  const activeTask = taskManager.tasks[0];
  const currentPomo = 1;
  return (
    <div className={'task-timer-container'}>
      <TaskTimerHeader task={activeTask} currentPomo={currentPomo} />


    </div>

  );
});
