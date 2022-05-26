import React from 'react';
import styles from './header.module.css';
import {ReactComponent as TomatoIcon} from '../../icons/tomato-icon.svg';
import {ReactComponent as StatisticsIcon} from '../../icons/statistics.svg';
import {Link} from 'react-router-dom';
export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/pomodoro-go" className={styles.container}>
        <TomatoIcon/>
        <span className={styles.title}>Pomodoro-GO</span>
      </Link>
      <Link to="/statistics" className={styles.container}>
        <StatisticsIcon/>
        <span className={styles.statistics}>Статистика</span>
      </Link>
    </header>
  );
}
