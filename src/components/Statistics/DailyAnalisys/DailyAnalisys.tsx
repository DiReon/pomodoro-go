import React from 'react';
import styles from './dailyanalisys.module.css';
import {ReactComponent as FocusIcon} from '../../../icons/focus.svg';
import {ReactComponent as TimePausedIcon} from '../../../icons/time-paused.svg';
import {ReactComponent as StopIcon} from '../../../icons/stop.svg';

export function DailyAnalisys() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div>
          <div><strong>Фокус</strong></div>
          <div className={styles.value}>27%</div>
        </div>
        <FocusIcon />
      </div>
      <div className={styles.item}>
        <div>
          <div><strong>Время на паузе</strong></div>
          <div className={styles.value}> 2 h 30 min</div>
        </div>
        <TimePausedIcon />
      </div>

      <div className={styles.item}>
        <div>
          <div><strong>Остановки</strong></div>
          <div className={styles.value}> 14</div>
        </div>
        <StopIcon />
      </div>
    </div>
  );
}
