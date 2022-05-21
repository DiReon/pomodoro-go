import React, {useEffect, useState} from 'react';
import styles from './tasktimer.module.css';
import {TaskTimerHeader} from './TaskTimerHeader';
import {observer} from 'mobx-react';
import {taskManager} from '../Tasks';
import {TaskTimerCard} from '../TaskTimerCard';

export enum ETaskState {
  WORK = 'WORK',
  BREAK = 'BREAK',
  STANDBY = 'STANDBY'
}

export const TaskTimer = observer(() => {
  const initialState = ETaskState.STANDBY as string;
  const [taskState, setTaskState] = useState(initialState);
  const [currentPomodoro, setCurrentPomodoro] = useState(1)
  const activeTask = taskManager.tasks[0];
  useEffect(() => {
    setCurrentPomodoro(1);
  }, [activeTask]);

  return (
    <div className={styles.taskTimerContainer}>
      <TaskTimerHeader
        task={activeTask}
        currentPomodoro={currentPomodoro}
        taskState={taskState}
      />
      <TaskTimerCard
        task={activeTask}
        startNextPomodoro={() => setCurrentPomodoro(currentPomodoro + 1)}
        taskState={taskState}
        setTaskState={status => setTaskState(status)}
      />
    </div>

  );
});
