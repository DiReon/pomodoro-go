import React, {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import './taskсard.css';
import {ITask} from '../interfaces/task.interface';
import {ReactComponent as MoreIcon} from '../icons/more.svg';
import {ReactComponent as PlusIcon} from '../icons/plus.svg';
import {ReactComponent as MinusIcon} from '../icons/minus.svg';
import {ReactComponent as PenIcon} from '../icons/pen.svg';
import {ReactComponent as CheckIcon} from '../icons/check-solid.svg';
import {ReactComponent as CancelIcon} from '../icons/xmark-solid.svg';

import {DropdownList} from '../DropdownList';
import {taskManager} from '../Tasks';
import {DeleteTask} from '../DeleteTask';

export function TaskCard({data: task}: {data: ITask}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = useCallback((event: MouseEvent) => {
  const node = document.querySelector('.modal');

    if (event.target instanceof Node
      && !ref.current?.contains(event.target)
      && !buttonRef.current?.contains(event.target)
      && !node
    ) {
      setIsDropdownOpen(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  function showMenu(event: React.MouseEvent) {
    if (isDropdownOpen) {
      document.removeEventListener("mousedown", handleClickOutside);
      setIsDropdownOpen(false);
      return;
    }
    document.addEventListener("mousedown", handleClickOutside);
    setIsDropdownOpen(true);
  }

  function changePomodoros(increment: number): void {
    task.pomodoros = task.pomodoros + increment
    const updatedTask = {...task, pomodoros: task.pomodoros}
    taskManager.updateTask(updatedTask);
  }

  function handleSubmit(event: FormEvent) {
    if (inputRef.current?.value){
      task.name = inputRef.current.value;
      taskManager.updateTask(task);
      setIsEditable(false);
    }
    event.preventDefault();
  }

  function editTask() {
    setIsEditable(true);
    setIsDropdownOpen(false);
    if (inputRef.current?.value){
      inputRef.current.value = task.name;
    }
  }

  return (
    <li className={'card'}>
      <div className={'task-info'}>
        <div className={'pomodoros'}>{task.pomodoros}</div>
        {!isEditable ? (<span>{task.name}</span>) : (
          <form onSubmit={handleSubmit} className={'edit-task-form'}>
            <input type="text" defaultValue={task.name} ref={inputRef} className={'edit-task-input'}/>
            <button className={'icon-btn confirm-btn'}>
              <CheckIcon fill={'var(--green)'} />
            </button>
            <button onClick={() => setIsEditable(false)} className={'icon-btn'}>
              <CancelIcon fill={'var(--black)'} />
            </button>
          </form>
        )}
      </div>

      <button onClick={(event) => showMenu(event)} ref={buttonRef}>
        <MoreIcon />
      </button>
      {isDropdownOpen && (
        <DropdownList>
          <ul ref={ref}  className={'menu'}>
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
              <button onClick={editTask}  className={'menu-item'}>
                <PenIcon /><span>Редактировать</span>
              </button>
            </li>
            <li>
              <DeleteTask task={task}/>
            </li>
          </ul>
        </DropdownList>
      )}
    </li>

  );
}
