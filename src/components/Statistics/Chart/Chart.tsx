import React, {ReactNode} from 'react';
import styles from './chart.modules.css';
import {journal} from '../../TaskTimer/Timer/TimerCard';
import {IDay} from '../../../interfaces/day.interface';
import {transformDuration} from '../../../utils/transform-duration';
import {generateRandomIndex} from '../../../utils/generateRandomIndex';
import {weekDays} from '../../../config/week-days';
import {IWeekDay} from '../../../interfaces/week.interface';

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
      date.setDate(currentDate - currentWeekDay + i - 7 * selectedWeek);
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
    return Math.ceil(Math.max(...workTimeArray) / 25);
  }

  function horizontalGridlines(): ReactNode[] {
    return Array(getWorkTimeAxisLimit()).fill(null).map((item, index) => {
      return (
        <div className="tick" style={{height: getSegmentHeight() + 'px'}} key={generateRandomIndex()}>
          <p>{transformDuration((index + 1) * 25)}</p>
        </div>
      )
    }).reverse();
  }

  function getSegmentHeight(): number {
    return 460 / getWorkTimeAxisLimit();
  }

  function getWeek(): IWeekDay[] {
    const result = [...weekDays, weekDays[0]];
    result.shift();
    return result;
  }

  return (
    <div className={styles.container}>
      <table id="taskChart">
        <tbody>
        {getWeek().map((item, index) => (
          <tr key={generateRandomIndex()} style={{left: 12 * index + '%'}}>
            <th scope="row">{item.shortName}</th>
            <td onClick={() => selectDay(index)} className="sent bar"
                style={{height: getWorkTimeHeight(index) + 'px'}}></td>
          </tr>
        ))}
        </tbody>
      </table>

      <div id="ticks">
        {horizontalGridlines()}
      </div>
    </div>
  );
}
