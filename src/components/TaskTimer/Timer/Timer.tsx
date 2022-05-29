import React, {useEffect, useState} from 'react';
import styles from './timer.module.css';
import {TimerHeader} from './TimerHeader';
import {observer} from 'mobx-react';
import {TimerCard} from './TimerCard';
import {taskManager} from './store/task-manager';

export enum ETaskState {
  WORK = 'WORK',
  BREAK = 'BREAK',
  STANDBY = 'STANDBY'
}

export const Timer = observer(() => {
  const initialState = ETaskState.STANDBY as string;
  const [taskState, setTaskState] = useState(initialState);
  const [currentPomodoro, setCurrentPomodoro] = useState(1);
  const activeTask = taskManager.tasks[0];
  useEffect(() => {
    setCurrentPomodoro(1);
  }, [activeTask]);

  return (
    <div className={styles.taskTimerContainer}>
      <TimerHeader
        task={activeTask}
        currentPomodoro={currentPomodoro}
        taskState={taskState}
      />
      <TimerCard
        task={activeTask}
        startNextPomodoro={() => setCurrentPomodoro(currentPomodoro + 1)}
        taskState={taskState}
        setTaskState={status => setTaskState(status)}
      />
    </div>

  );
});
