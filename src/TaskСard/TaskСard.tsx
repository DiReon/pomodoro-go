import React, {useState} from 'react';
import './taskсard.css';
import {ITask} from '../interfaces/task.interface';
import {ReactComponent as MoreIcon} from '../icons/more.svg';
import {ReactComponent as PlusIcon} from '../icons/plus.svg';
import {ReactComponent as MinusIcon} from '../icons/minus.svg';
import {ReactComponent as PenIcon} from '../icons/pen.svg';
import {ReactComponent as TrashIcon} from '../icons/trash.svg';
import {DropdownList} from '../DropdownList';

export function TaskСard({name, pomodoros}: ITask) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  function showMenu() {
    console.log('show menu');
    setIsDropdownOpen(!isDropdownOpen);
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
      {isDropdownOpen && (
        <DropdownList>
          <ul className={'menu'}>
            <li className={'menu-item'}>
              <PlusIcon /><span>Увеличить</span>
            </li>
            <li className={'menu-item'}>
              <MinusIcon /><span>Уменьшить</span>
            </li>
            <li className={'menu-item'}>
              <PenIcon /><span>Редактировать</span>
            </li>
            <li className={'menu-item'}>
              <TrashIcon /><span>Удалить</span>
            </li>
          </ul>
        </DropdownList>
      )}
    </li>

  );
}
