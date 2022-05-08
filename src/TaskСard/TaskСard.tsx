import React from 'react';
import './taskсard.css';
import {ITask} from '../interfaces/task.interface';
import {ReactComponent as MoreIcon} from '../icons/more.svg';

export function TaskСard({name, pomodoros}: ITask) {
  function showMenu() {
    console.log('show menu');
  }
  return (
    <li className={'card'}>
      <div>
        <div className={'pomodoros'}>{pomodoros}</div>
        <span>{name}</span>
      </div>
      <button onClick={showMenu}>
        <MoreIcon />
      </button>
    </li>

  );
}
