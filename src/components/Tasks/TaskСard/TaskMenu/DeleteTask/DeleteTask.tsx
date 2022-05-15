import React, {useEffect, useState} from 'react';
import styles from './deletetask.css';
import {ReactComponent as TrashIcon} from '../../../../../icons/trash.svg';
import {ConfirmationPopup} from './ConfirmationPopup';
import {ITask} from '../../../../../interfaces/task.interface';

export function DeleteTask({task}: {task: ITask}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsModalOpen(false);
  }

  return (
    <button onClick={() => {setIsModalOpen(true)}} className={'menu-item'}>
      <TrashIcon /><span>Удалить</span>
      {isModalOpen && (<ConfirmationPopup task={task} onClose={(event) => closeModal(event)} /> || <div />)}
    </button>
  );
}
