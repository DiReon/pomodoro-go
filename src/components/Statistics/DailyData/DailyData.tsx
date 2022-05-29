import React from 'react';
import styles from './dailydata.module.css';
import {ReactComponent as TomatoIcon} from '../../../icons/tomato-icon.svg';
import {ReactComponent as TomatoIconSmiling} from '../../../icons/tomato-icon-smiling.svg';
import {transformDuration} from '../../../utils/transform-duration';
import {weekDays} from '../../../config/week-days';
import {IDay} from '../../../interfaces/day.interface';

export function DailyData({selectedDay}: {selectedDay: IDay}) {
  function getWorkTime(): number {
    const time = selectedDay.workTime;
    return time ? Math.round(time) : 0;
  }

  function getWeekDay(): string {
    if (!selectedDay?.date) {
      return weekDays[1].longName;
    }
    const date = new Date(selectedDay.date);
    return weekDays[date.getDay()].longName;
  }

  function getWorkTimeText(): string {
    const lastDigit = getWorkTime() % 10;
    if (lastDigit === 1) {
      return transformDuration(getWorkTime()) + 'уты';
    }
    return transformDuration(getWorkTime()) + 'ут';
  }

  function getPomodorosTextQuantity(): string {
    const qty = selectedDay.pomodoros;
    if (!qty) {
      return '';
    }
    const lastDigit = qty % 10;
    if (lastDigit > 1 && lastDigit < 5 ) {
      return qty + ' помидора';
    }
    return qty + ' помидор';
  }

  function getDate() {
    const date = new Date(selectedDay.date);
    return date.toLocaleDateString('ru-RU');
  }


  return (
    <div className={styles.dataNumbers}>

      <div className={styles.workTime}>
        <div className={styles.date}>
          <span>{getWeekDay()}</span>
          <span>{getDate()}</span>
        </div>
        {getWorkTime() > 0 ?
          (<div>Вы работали над задачами в течение {getWorkTimeText()}</div>) :
          (<div>Нет данных</div>)
        }
      </div>

      {selectedDay?.pomodoros ? (
        <div className={styles.pomodoros}>
          <div className={styles.pomodorosPicture}>
            <TomatoIcon />
            <span>x {selectedDay?.pomodoros}</span>
          </div>
          <div className={styles.pomodorosQty}>{getPomodorosTextQuantity()}</div>
        </div>
      ) : (
        <div className={styles.pomodoros}>
          <TomatoIconSmiling />
        </div>
      )
      }
    </div>
  );
}
