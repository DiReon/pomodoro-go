import React, {useEffect, useRef, useState} from 'react';
import styles from './timercard.module.css';
import {ITask} from '../../../../interfaces/task.interface';
import {ETaskState} from '../index';
import {taskManager} from '../store/task-manager';
import {journal} from '../store/journal';

enum STATUS {
  STARTED = 'Started',
  PAUSED = 'Paused',
  STOPPED = 'Stopped'
}

interface ITimerCardProps {
  task: ITask;
  startNextPomodoro: () => void;
  taskState: string;
  setTaskState: (value: string) => void;
}

const WORK_DURATION = 25;
const BREAK_DURATION_SHORT = 5;
const BREAK_DURATION_LONG = 15;

export function TimerCard({task, startNextPomodoro, taskState, setTaskState}: ITimerCardProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(WORK_DURATION);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const [timestampPaused, setTimestampPaused] = useState(0);

  function getBreakDuration(): number {
    const pomodoros = journal?.currentDay?.pomodoros;
    return (pomodoros && pomodoros % 4 === 0) ? BREAK_DURATION_LONG : BREAK_DURATION_SHORT;
  }

  const handleStart = () => {
    if (status === STATUS.STOPPED && taskState === ETaskState.STANDBY) {
      setTaskState(ETaskState.WORK);
    }
    if (status === STATUS.PAUSED) {
      console.log((Date.now() - timestampPaused) / 1000);
      console.log(timestampPaused);
      journal.addPausedTime((Date.now() - timestampPaused) / 1000);
    }
    setStatus(STATUS.STARTED);
  };

  const handlePause = () => {
    setStatus(STATUS.PAUSED);
    setTimestampPaused(Date.now());
    console.log(timestampPaused);
  };

  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(WORK_DURATION);
    setTaskState(ETaskState.STANDBY);
  };

  function handleCompleted() {
    setStatus(STATUS.STOPPED);
    taskManager.deleteTask(task);
    setSecondsRemaining(WORK_DURATION);
    setTaskState(ETaskState.STANDBY);
  }

  function togglePeriod(): void {
    setStatus(STATUS.STOPPED);
    if (taskState === ETaskState.WORK) {
      setSecondsRemaining(getBreakDuration());
      setTaskState(ETaskState.BREAK);
      journal.addPomodoro();
      console.log(journal.currentDay);
    }
    if (taskState === ETaskState.BREAK) {
      setSecondsRemaining(WORK_DURATION);
      startNextPomodoro();
      setTaskState(ETaskState.STANDBY);
    }
  }

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
        taskState === ETaskState.WORK ? journal.addWorkTime() : journal.addBreakTime();
      } else {
        togglePeriod();
      }
    },
    status === STATUS.STARTED ? 1000 : 0,
    // passing 0 stops the interval
  );

  function getTimerStyle(): string {
    if (status !== STATUS.STARTED) {
      return '';
    }
    switch (taskState) {
      case ETaskState.WORK:
        return `${styles.redTimer}`;
      case ETaskState.BREAK:
        return `${styles.greenTimer}`;
      default:
        return '';
    }
  }

  return (
    <div>
      <div className={`${styles.remainingTime} ${getTimerStyle()}`}>
        {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
      </div>

      {task && (<div>???????????? 1: {task.name}</div>)}

      <div className={styles.actionButtons}>
        {status === STATUS.STOPPED && (
          <>
            <button onClick={handleStart} className={styles.btnSuccess}>??????????</button>
            <button disabled className={styles.btnWarning}>????????</button>
          </>
        )}
        {status === STATUS.STARTED && (
          <button onClick={handlePause} className={styles.btnSuccess}>??????????</button>
        )}
        {status === STATUS.PAUSED && (
          <button onClick={handleStart} className={styles.btnSuccess}>????????????????????</button>
        )}
        {taskState === ETaskState.WORK && status === STATUS.STARTED && (
          <button onClick={handleReset} className={styles.btnWarning}>????????</button>
        )}
        {taskState === ETaskState.WORK && status === STATUS.PAUSED && (
          <button onClick={handleCompleted} className={styles.btnWarning}>??????????????</button>
        )}
        {taskState === ETaskState.BREAK && (status === STATUS.STARTED || status === STATUS.PAUSED) && (
          <button onClick={togglePeriod} className={styles.btnWarning}>????????????????????</button>
        )}
      </div>
    </div>
  );
}

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback?.current) {
        savedCallback.current();
      }
    }

    if (delay !== 0) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const twoDigits = (num: number) => String(num).padStart(2, '0');