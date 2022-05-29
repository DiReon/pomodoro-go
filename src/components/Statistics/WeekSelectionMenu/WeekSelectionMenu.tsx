import React from 'react';
import styles from './weekselectionmenu.module.css';
import {DropdownList} from '../../shared/DropdownList';
import {IWeekData} from '../../../interfaces/week.interface';
import {weekTypes} from '../../../config/week-types';

interface IWeekSelectionMenuProps {
  onSelectWeek: (value: IWeekData) => void;
}

export function WeekSelectionMenu({onSelectWeek}: IWeekSelectionMenuProps) {
  return (
    <DropdownList>
      <ul className={styles.menu}>
        {(Object.values(weekTypes) as IWeekData[]).map(item => (
          <li key={item.value}>
            <button onClick={() => onSelectWeek(item)} className={styles.menuItem}>
              <span>{item.caption}</span>
            </button>
          </li>
          ))}
      </ul>
    </DropdownList>
  );
}
