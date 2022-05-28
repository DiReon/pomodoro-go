import React, {useState} from 'react';
import styles from './statistics.module.css';
import {journal} from '../TaskTimer/Timer/TimerCard';
import {ReactComponent as TomatoIcon} from '../../icons/tomato-icon.svg';
import {ReactComponent as TomatoIconSmiling} from '../../icons/tomato-icon-smiling.svg';
import {Chart} from './Chart';
import {transformDuration} from '../../utils/transform-duration';
import {WeekSelectionMenu} from './WeekSelectionMenu';

const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export interface IWeekData {
  value: number;
  caption: string;
}

export interface IWeek {
  thisWeek: IWeekData;
  previousWeek: IWeekData;
  twoWeeksBefore: IWeekData;
}

export const weekTypes: IWeek = {
  thisWeek: {
    value: 0,
    caption: 'Эта неделя'
  },
  previousWeek: {
    value: 1,
    caption: 'Прошедшая неделя'
  },
  twoWeeksBefore: {
    value: 2,
    caption: 'Две недели назад'
  },
}

export function Statistics() {
  const [selectedDay, setSelectedDay] = useState(journal.currentDay);
  const [selectedWeek, setSelectedWeek] = useState(weekTypes.thisWeek);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  function onSelectWeek(value: IWeekData): void {
    setSelectedWeek(value);
    setIsDropdownOpen(false);
  }

  function getDate() {
    const date = new Date(selectedDay.date);
    return date.toLocaleDateString('ru-RU');
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <strong>Ваша активность</strong>
        <button onClick={() => setIsDropdownOpen(true)} className={styles.menuBtn}>{selectedWeek.caption}</button>
        {isDropdownOpen && (<span className={styles.listContainer}>
          <WeekSelectionMenu onSelectWeek={(value) => onSelectWeek(value)} />
        </span>)}
      </div>
      <div className={styles.data}>
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
        <div className={styles.chart}>
          <Chart setSelectedDay={(value) => setSelectedDay(value)} selectedWeek={selectedWeek.value}/>
        </div>
      </div>
    </div>

  );
}
