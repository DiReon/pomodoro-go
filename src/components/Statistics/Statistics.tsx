import React, {useState} from 'react';
import styles from './statistics.module.css';
import {Chart} from './Chart';
import {WeekSelectionMenu} from './WeekSelectionMenu';
import {DailyAnalisys} from './DailyAnalisys';
import {weekTypes} from '../../config/week-types';
import {IWeekData} from '../../interfaces/week.interface';
import {journal} from '../TaskTimer/Timer/store/journal';
import {DailyData} from './DailyData';

export function Statistics() {
  const [selectedDay, setSelectedDay] = useState(journal.currentDay);
  const [selectedWeek, setSelectedWeek] = useState(weekTypes.thisWeek);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function onSelectWeek(value: IWeekData): void {
    setSelectedWeek(value);
    setIsDropdownOpen(false);
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
        <DailyData selectedDay={selectedDay} />
        <div className={styles.chart}>
          <Chart setSelectedDay={(value) => setSelectedDay(value)} selectedWeek={selectedWeek.value}/>
        </div>
      </div>
      <DailyAnalisys day={selectedDay} />
    </div>
  );
}
