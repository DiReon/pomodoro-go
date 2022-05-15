import React from 'react';
import styles from './header.module.css';
import {ReactComponent as TomatoIcon} from '../../icons/tomato-icon.svg';
import {ReactComponent as StatisticsIcon} from '../../icons/statistics.svg';
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <TomatoIcon/>
        <span className={styles.title}>Pomodoro-GO</span>
      </div>
      <div className={styles.container}>
        <StatisticsIcon/>
        <span className={styles.statistics}>Статистика</span>
      </div>
    </header>
  );
}
