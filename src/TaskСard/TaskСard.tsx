import React, {useEffect, useRef, useState} from 'react';
import './taskсard.css';
import {ITask} from '../interfaces/task.interface';
import {ReactComponent as MoreIcon} from '../icons/more.svg';
import {ReactComponent as PlusIcon} from '../icons/plus.svg';
import {ReactComponent as MinusIcon} from '../icons/minus.svg';
import {ReactComponent as PenIcon} from '../icons/pen.svg';
import {ReactComponent as TrashIcon} from '../icons/trash.svg';
import {DropdownList} from '../DropdownList';
import {taskManager} from '../Tasks';

export function TaskCard({data: task}: {data: ITask}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  function showMenu() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function changePomodoros(increment: number): void {
    task.pomodoros = task.pomodoros + increment
    const updatedTask = {...task, pomodoros: task.pomodoros}
    taskManager.updateTask(updatedTask);
  }

  return (
    <li className={'card'}>
      <div>
        <div className={'pomodoros'}>{task.pomodoros}</div>
        <span>{task.name}</span>
      </div>
      <button onClick={showMenu}>
        <MoreIcon />
      </button>
      {isDropdownOpen && (
        <DropdownList>
          <ul ref={wrapperRef}  className={'menu'}>
            <li>
              <button onClick={() => changePomodoros(1)} className={'menu-item'}>
                <PlusIcon /><span>Увеличить</span>
              </button>
            </li>
            <li>
              <button onClick={() => changePomodoros(-1)} disabled={task.pomodoros < 2} className={'menu-item'}>
                <MinusIcon /><span>Уменьшить</span>
              </button>
            </li>
            <li>
              <button onClick={() => ({})}  className={'menu-item'}>
                <PenIcon /><span>Редактировать</span>
              </button>
            </li>
            <li>
              <button onClick={() => ({})} className={'menu-item'}>
                <TrashIcon /><span>Удалить</span>
              </button>
            </li>
          </ul>
        </DropdownList>
      )}
    </li>

  );
}
