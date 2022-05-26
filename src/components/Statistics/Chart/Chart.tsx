import React from 'react';
import styles from './chart.modules.css';
import {journal} from '../../TaskTimer/Timer/TimerCard';
import {IDay} from '../../../interfaces/day.interface';

interface IChartProps {
  setSelectedDay: (value: IDay) => void;
  selectedWeek: number
}

export function Chart({setSelectedDay, selectedWeek}: IChartProps) {

  function getCurrentWeekData(): (IDay | null)[] {
    const date = new Date();
    const currentDate = date.getDate();
    const currentWeekDay = date.getDay() === 0 ? 7 : date.getDay();
    const result = [];
    for (let i = 1; i < 8; i++) {
      date.setDate(currentDate - currentWeekDay + i);
      result.push(journal.days.find(item => item.date === date.toDateString()) || null);
    }
    return result;
  }

  function getWorkTime(index: number): number {
    return (getCurrentWeekData()[index]?.workTime || 0) * 92 / 25;
  }

  function selectDay(index: number): void {
    const day = getCurrentWeekData()[index];
    if (day) {
      setSelectedDay(day);
    }
  }

  return (
    <div className={styles.container}>
      <table id="taskChart">
        <caption>Результаты</caption>
        <tbody>
        <tr className="qtr" id="mo">
          <th scope="row">Пн</th>
          <td onClick={() => selectDay(0)} className="sent bar" style={{height: getWorkTime(0) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="tu">
          <th scope="row">Вт</th>
          <td onClick={() => selectDay(1)} className="sent bar" style={{height: getWorkTime(1) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="we">
          <th scope="row">Ср</th>
          <td onClick={() => selectDay(2)} className="sent bar" style={{height: getWorkTime(2) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="th">
          <th scope="row">Чт</th>
          <td onClick={() => selectDay(3)} className="sent bar" style={{height: getWorkTime(3) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="fr">
          <th scope="row">Пт</th>
          <td onClick={() => selectDay(4)} className="sent bar" style={{height: getWorkTime(4) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="sa">
          <th scope="row">Сб</th>
          <td onClick={() => selectDay(5)} className="sent bar" style={{height: getWorkTime(5) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="su">
          <th scope="row">Вс</th>
          <td onClick={() => selectDay(6)} className="sent bar" style={{height: getWorkTime(6) + 'px'}}></td>
        </tr>
        </tbody>
      </table>

      <div id="ticks">
        <div className="tick"><p>2 ч 5 мин</p></div>
        <div className="tick"><p>1 ч 40 мин</p></div>
        <div className="tick"><p>1 ч 15 мин</p></div>
        <div className="tick"><p>50 мин</p></div>
        <div className="tick"><p>25 мин</p></div>
      </div>
    </div>

  );
}
