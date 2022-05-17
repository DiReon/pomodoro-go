import React, {useEffect, useRef, useState} from 'react';
import styles from './tasktimercard.module.css';
import {ITask} from "../../interfaces/task.interface";

const STATUS = {
  STARTED: 'Started',
  PAUSED: 'Paused',
  STOPPED: 'Stopped'
}

const INITIAL_COUNT = 1500

export function TaskTimerCard({task}: {task: ITask}) {

  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
  const [status, setStatus] = useState(STATUS.STOPPED)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

  const handleStart = () => {
    setStatus(STATUS.STARTED)
  }
  const handleStop = () => {
    setStatus(STATUS.PAUSED)
  }
  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(INITIAL_COUNT)
  }
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ? 1000 : 0,
    // passing null stops the interval
  )
  return (
    <div>
      <div className={styles.remainingTime}>{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}</div>
      {task && (<div>Задача 1: {task.name}</div>)}
      <div className={styles.actionButtons}>
        {status === STATUS.STOPPED && (<button onClick={handleStart} className={styles.btnSuccess}>Старт</button>)}
        {status === STATUS.PAUSED && (<button onClick={handleStart} className={styles.btnSuccess}>Продолжить</button>)}
        {status === STATUS.STARTED && (<button onClick={handleStop} className={styles.btnSuccess}>Пауза</button>)}
        {status === STATUS.PAUSED && (<button onClick={handleReset} className={styles.btnWarning}>Сделано</button>)}
        {status !== STATUS.PAUSED && (<button onClick={handleReset} className={styles.btnWarning}>Стоп</button>)}
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

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num: number) => String(num).padStart(2, '0')