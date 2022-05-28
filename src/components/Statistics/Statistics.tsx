import React, {useState} from 'react';
import styles from './statistics.module.css';
import {journal} from '../TaskTimer/Timer/TimerCard';
import {ReactComponent as TomatoIcon} from '../../icons/tomato-icon.svg';
import {ReactComponent as TomatoIconSmiling} from '../../icons/tomato-icon-smiling.svg';
import {Chart} from './Chart';
import {transformDuration} from '../../utils/transform-duration';

const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export function Statistics() {
  const [selectedDay, setSelectedDay] = useState(journal.currentDay);
  const [selectedWeek, setSelectedWeek] = useState(0);
  function getWeekDay(): string {

    if (!selectedDay?.date) {
      return weekDays[1];
    }
    const date = new Date(selectedDay.date);
    return weekDays[date.getDay()];
  }

  function getWorkTime(): number {
    const time = selectedDay.workTime;
    return time ? Math.round(time) : 0;
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

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <strong>Ваша активность</strong>
        <div>Menu</div>
      </div>
      <div className={styles.data}>
        <div className={styles.dataNumbers}>

          <div className={styles.workTime}>
            <div className={styles.weekDay}>{getWeekDay()}</div>
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
        <div className={styles.chart}>
          <Chart setSelectedDay={(value) => setSelectedDay(value)} selectedWeek={selectedWeek}/>
        </div>
      </div>
    </div>

  );
}
