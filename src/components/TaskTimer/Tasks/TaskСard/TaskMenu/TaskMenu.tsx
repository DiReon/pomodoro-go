import React from 'react';
import styles from './taskmenu.module.css';
import {DropdownList} from "../../../../shared/DropdownList";
import {ReactComponent as PlusIcon} from "../../../../../icons/plus.svg";
import {ReactComponent as MinusIcon} from "../../../../../icons/minus.svg";
import {ReactComponent as PenIcon} from "../../../../../icons/pen.svg";
import {DeleteTask} from "./DeleteTask";
import {taskManager} from "../../index";
import {ITask} from "../../../../../interfaces/task.interface";

interface ITaskMenu {
  task: ITask;
  editTask: () => void;
}

export function TaskMenu({task, editTask}: ITaskMenu) {

  function changePomodoros(increment: number): void {
    task.pomodoros = task.pomodoros + increment
    const updatedTask = {...task, pomodoros: task.pomodoros}
    taskManager.updateTask(updatedTask);
  }

  return (
    <DropdownList>
      <ul className={styles.menu}>
        <li>
          <button onClick={() => changePomodoros(1)} className={styles.menuItem}>
            <PlusIcon /><span>Увеличить</span>
          </button>
        </li>
        <li>
          <button onClick={() => changePomodoros(-1)} disabled={task.pomodoros < 2} className={styles.menuItem}>
            <MinusIcon /><span>Уменьшить</span>
          </button>
        </li>
        <li>
          <button onClick={editTask}  className={styles.menuItem}>
            <PenIcon /><span>Редактировать</span>
          </button>
        </li>
        <li>
          <DeleteTask task={task}/>
        </li>
      </ul>
    </DropdownList>
  );
}
