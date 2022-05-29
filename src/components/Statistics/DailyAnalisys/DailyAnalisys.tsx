import React from 'react';
import styles from './dailyanalisys.module.css';
import {ReactComponent as FocusIcon} from '../../../icons/focus.svg';
import {ReactComponent as TimePausedIcon} from '../../../icons/time-paused.svg';
import {ReactComponent as StopIcon} from '../../../icons/stop.svg';
import {IDay} from '../../../interfaces/day.interface';
import {transformDuration} from '../../../utils/transform-duration';

export function DailyAnalisys({day}: {day: IDay}) {

  function getFocus(): number {
    return Math.round(day.pomodoros * 25 / (day.workTime + day.breakTime) * 100) || 0;
  }

  function getTimePaused(): string {
    return transformDuration(day.pausedTime);
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div>
          <div><strong>Фокус</strong></div>
          <div className={styles.value}>{getFocus()} %</div>
        </div>
        <FocusIcon />
      </div>
      <div className={styles.item}>
        <div>
          <div><strong>Время на паузе</strong></div>
          <div className={styles.value}>{getTimePaused()}</div>
        </div>
        <TimePausedIcon />
      </div>

      <div className={styles.item}>
        <div>
          <div><strong>Остановки</strong></div>
          <div className={styles.value}>{day.stops}</div>
        </div>
        <StopIcon />
      </div>
    </div>
  );
}
