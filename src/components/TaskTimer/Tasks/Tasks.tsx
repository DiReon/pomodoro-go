import React, {FormEvent, useRef} from 'react';
import styles from './tasks.module.css';
import {generateId} from '../../../utils/generateRandomIndex';
import {TaskCard} from './TaskСard';
import {transformDuration} from '../../../utils/transform-duration';
import {taskManager} from '../Timer/store/task-manager';
import {observer} from 'mobx-react';

export const Tasks = observer(() => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    if (inputRef.current?.value) {
      const taskWithId = generateId({name: inputRef.current.value, pomodoros: 1});
      taskManager.addTask(taskWithId);
      inputRef.current.value = '';
    }

    event.preventDefault();
  }

  function getTotalTime() {
    const minutes = taskManager.tasks.map(item => item.pomodoros * 25)
      .reduce((prev, curr) => prev + curr, 0);
    return transformDuration(minutes);
  }

  return (
    <div className={styles.tasksContainer}>
      <h3>Ура! Теперь можно начать работать:</h3>
      <ul className={styles.instructions}>
        <li>Выберите категорию и напишите название текущей задачи</li>
        <li>Запустите таймер («помидор»)</li>
        <li>Работайте пока «помидор» не прозвонит</li>
        <li>Сделайте короткий перерыв (3-5 минут)</li>
        <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" className={styles.taskInput} placeholder={'Название задачи'} ref={inputRef}/>
        <button className={styles.btnSuccess}>Добавить</button>
      </form>
      {!!taskManager.tasks?.length && (
        <div>
          <ul className={styles.taskList}>
            {taskManager.tasks.map(item => (
              <TaskCard key={item.id} data={item} />
            ))}
          </ul>
          <div className={styles.totalTime}>{getTotalTime()}</div>
        </div>
      )}
    </div>
  );
});
