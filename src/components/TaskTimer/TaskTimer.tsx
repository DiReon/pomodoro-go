import React, {useEffect, useState} from 'react';
import styles from './tasktimer.module.css';
import {TaskTimerHeader} from './TaskTimerHeader';
import {observer} from 'mobx-react';
import {taskManager} from '../Tasks';
import {TaskTimerCard} from '../TaskTimerCard';

export const TaskTimer = observer(() => {
  const [isBreakPeriod, setIsBreakPeriod] = useState(false);
  const [currentPomodoro, setCurrentPomodoro] = useState(1)
  const activeTask = taskManager.tasks[0];

  useEffect(() => {
    setCurrentPomodoro(1);
  }, [activeTask]);

  return (
    <div className={styles.taskTimerContainer}>
      <TaskTimerHeader task={activeTask} currentPomo={currentPomodoro} isBreakPeriod={isBreakPeriod}/>
      <TaskTimerCard
        task={activeTask}
        startNextPomodoro={() => setCurrentPomodoro(currentPomodoro + 1)}
        isBreakPeriod={isBreakPeriod}
        toggleBreakPeriod={() => setIsBreakPeriod(!isBreakPeriod)}
      />
    </div>

  );
});
