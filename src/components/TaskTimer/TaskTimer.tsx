import React from 'react';
import styles from './tasktimer.module.css';
import {Tasks} from './Tasks';
import {Timer} from './Timer';

export function TaskTimer() {
  return (
    <div className={styles.layout}>
      <Tasks />
      <Timer />
    </div>
  );
}
