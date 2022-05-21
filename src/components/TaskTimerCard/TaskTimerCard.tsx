import React, {useEffect, useRef, useState} from 'react';
import styles from './tasktimercard.module.css';
import {ITask} from '../../interfaces/task.interface';
import {taskManager} from '../Tasks';
import {ETaskState} from '../TaskTimer';

enum STATUS {
  STARTED = 'Started',
  PAUSED = 'Paused',
  STOPPED = 'Stopped'
}

const WORK_DURATION = 10;
const BREAK_DURATION = 5;

interface ITaskTimerCardProps {
  task: ITask;
  startNextPomodoro: () => void;
  taskState: string;
  setTaskState: (value: string) => void;
}

export function TaskTimerCard(
  {
    task,
    startNextPomodoro,
    taskState,
    setTaskState,
  }: ITaskTimerCardProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(WORK_DURATION);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60

  const handleStart = () => {
    if (status === STATUS.STOPPED && taskState === ETaskState.STANDBY) {
      setTaskState(ETaskState.WORK);
    }
    setStatus(STATUS.STARTED);
  }

  const handlePause = () => {
    setStatus(STATUS.PAUSED)
  }

  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(WORK_DURATION);
    setTaskState(ETaskState.STANDBY);
  }

  function handleCompleted() {
    setStatus(STATUS.STOPPED);
    taskManager.deleteTask(task);
    setSecondsRemaining(WORK_DURATION);
    setTaskState(ETaskState.STANDBY);
  }

  function togglePeriod(): void {
    setStatus(STATUS.STOPPED);
    if (taskState === ETaskState.WORK) {
      setSecondsRemaining(BREAK_DURATION);
      setTaskState(ETaskState.BREAK);
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
      } else {
        togglePeriod();
      }
    },
    status === STATUS.STARTED ? 1000 : 0,
    // passing 0 stops the interval
  )

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

      {task && (<div>Задача 1: {task.name}</div>)}

      <div className={styles.actionButtons}>
        {status === STATUS.STOPPED && (
          <>
            <button onClick={handleStart} className={styles.btnSuccess}>Старт</button>
            <button disabled className={styles.btnWarning}>Стоп</button>
          </>
        )}
        {status === STATUS.STARTED && (
          <button onClick={handlePause} className={styles.btnSuccess}>Пауза</button>
        )}
        {status === STATUS.PAUSED && (
          <button onClick={handleStart} className={styles.btnSuccess}>Продолжить</button>
        )}
        {taskState === ETaskState.WORK && status === STATUS.STARTED && (
          <button onClick={handleReset} className={styles.btnWarning}>Стоп</button>
        )}
        {taskState === ETaskState.WORK && status === STATUS.PAUSED && (
          <button onClick={handleCompleted} className={styles.btnWarning}>Сделано</button>
        )}
        {taskState === ETaskState.BREAK && (status === STATUS.STARTED || status === STATUS.PAUSED) && (
          <button onClick={togglePeriod} className={styles.btnWarning}>Пропустить</button>
        )}
      </div>
    </div>
  );
}

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback?.current) {
        savedCallback.current()
      }
    }

    if (delay !== 0) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const twoDigits = (num: number) => String(num).padStart(2, '0')