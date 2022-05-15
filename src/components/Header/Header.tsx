import React from 'react';
import './header.css';
import {ReactComponent as TomatoIcon} from '../../icons/tomato-icon.svg';
import {ReactComponent as StatisticsIcon} from '../../icons/statistics.svg';
export function Header() {
  return (
    <header className={'header'}>
      <div className={'container'}>
        <TomatoIcon/>
        <span className={'title'}>Pomodoro-GO</span>
      </div>
      <div className={'container'}>
        <StatisticsIcon/>
        <span className={'statistics'}>Статистика</span>
      </div>
    </header>
  );
}
