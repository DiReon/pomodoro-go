import React from 'react';
import './confirmationpopup.css';
import ReactDOM from 'react-dom';
import {taskManager} from '../../../../index';
import {ITask} from '../../../../../../interfaces/task.interface';

export function ConfirmationPopup({task, onClose}: {task: ITask, onClose: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
  const node = document.querySelector('#root');
  if (!node) {
    return null;
  }

  function deleteTask(event: React.MouseEvent<HTMLButtonElement>): void {
    taskManager.deleteTask(task);
  }

  return ReactDOM.createPortal((
    <div className={'modal'}>
      <div className={'modal-content'}>
        <h3>Удалить задачу?</h3>
        <button onClick={deleteTask} className={'btn-warning'}>Удалить</button>
        <button onClick={(event) => onClose(event)} className={'btn-text'}>Отмена</button>
      </div>
    </div>
  ), node);
}
