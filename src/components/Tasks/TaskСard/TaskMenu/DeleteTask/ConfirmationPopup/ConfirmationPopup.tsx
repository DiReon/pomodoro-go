import React from 'react';
import styles from './confirmationpopup.module.css';
import ReactDOM from 'react-dom';
import {taskManager} from '../../../../index';
import {ITask} from '../../../../../../interfaces/task.interface';

export function ConfirmationPopup({task, onClose}: {task: ITask, onClose: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
  const node = document.querySelector('#root');
  if (!node) {
    return null;
  }

  function deleteTask(): void {
    taskManager.deleteTask(task);
  }

  return ReactDOM.createPortal((
    <div id="modal" className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Удалить задачу?</h3>
        <button onClick={() => deleteTask()} className={styles.btnWarning}>Удалить</button>
        <button onClick={(event) => onClose(event)} className={styles.btnText}>Отмена</button>
      </div>
    </div>
  ), node);
}
