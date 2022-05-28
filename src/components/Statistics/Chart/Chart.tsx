import React, {ReactNode} from 'react';
import styles from './chart.modules.css';
import {journal} from '../../TaskTimer/Timer/TimerCard';
import {IDay} from '../../../interfaces/day.interface';
import {transformDuration} from '../../../utils/transform-duration';
import {generateRandomIndex} from '../../../utils/generateRandomIndex';

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

  function getWorkTimeHeight(index: number): number {
    return (getCurrentWeekData()[index]?.workTime || 0) * getSegmentHeight() / 25;
  }

  function selectDay(index: number): void {
    const day = getCurrentWeekData()[index];
    if (day) {
      setSelectedDay(day);
    }
  }

  function getWorkTimeAxisLimit(): number {
    const workTimeArray = getCurrentWeekData().map(item => item?.workTime).filter(item => !!item) as number[];
    const result = Math.ceil(Math.max(...workTimeArray) / 25);
    return result;
  }

  function horizontalGridlines(): ReactNode[] {
    const result = Array(getWorkTimeAxisLimit()).fill(null).map((item, index) => {
      return (
        <div className="tick" style={{height: getSegmentHeight() + 'px'}} key={generateRandomIndex()}>
          <p>{transformDuration((index + 1) * 25)}</p>
        </div>
      )
    }).reverse();
    return result;
  }

  function getSegmentHeight(): number {
    return 460 / getWorkTimeAxisLimit();
  }

  return (
    <div className={styles.container}>
      <table id="taskChart">
        <caption>Результаты</caption>
        <tbody>
        <tr className="qtr" id="mo">
          <th scope="row">Пн</th>
          <td onClick={() => selectDay(0)} className="sent bar" style={{height: getWorkTimeHeight(0) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="tu">
          <th scope="row">Вт</th>
          <td onClick={() => selectDay(1)} className="sent bar" style={{height: getWorkTimeHeight(1) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="we">
          <th scope="row">Ср</th>
          <td onClick={() => selectDay(2)} className="sent bar" style={{height: getWorkTimeHeight(2) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="th">
          <th scope="row">Чт</th>
          <td onClick={() => selectDay(3)} className="sent bar" style={{height: getWorkTimeHeight(3) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="fr">
          <th scope="row">Пт</th>
          <td onClick={() => selectDay(4)} className="sent bar" style={{height: getWorkTimeHeight(4) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="sa">
          <th scope="row">Сб</th>
          <td onClick={() => selectDay(5)} className="sent bar" style={{height: getWorkTimeHeight(5) + 'px'}}></td>
        </tr>
        <tr className="qtr" id="su">
          <th scope="row">Вс</th>
          <td onClick={() => selectDay(6)} className="sent bar" style={{height: getWorkTimeHeight(6) + 'px'}}></td>
        </tr>
        </tbody>
      </table>

      <div id="ticks">
        {horizontalGridlines()}
      </div>
    </div>

  );
}
