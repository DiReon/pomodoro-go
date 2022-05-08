import React, {FormEvent, useRef} from 'react';
import './tasks.css';
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react";
import {ITask} from '../interfaces/task.interface';
import {generateId} from '../utils/generateRandomIndex';
import {TaskСard} from '../TaskСard';

class TaskManager {
  tasks: ITask[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  addTask(task: ITask) {
    this.tasks = [...this.tasks, task];
  }
}
const taskManager = new TaskManager();
export const Tasks = observer(() => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    console.log(inputRef.current?.value);
    if (inputRef.current?.value){
      const taskWithId = generateId({name: inputRef.current.value, pomodoros: 1})
      taskManager.addTask(taskWithId);
      inputRef.current.value = '';
    }

    event.preventDefault();
  }
  return (
    <div className={'tasks-container'}>
      <h3>Ура! Теперь можно начать работать:</h3>
      <ul className={'instructions'}>
        <li>Выберите категорию и напишите название текущей задачи</li>
        <li>Запустите таймер («помидор»)</li>
        <li>Работайте пока «помидор» не прозвонит</li>
        <li>Сделайте короткий перерыв (3-5 минут)</li>
        <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" className={'task-input'} placeholder={'Название задачи'} ref={inputRef}/>
        <button className={'btn-success'}>Добавить</button>
      </form>
      <ul className={'task-list'}>
        {taskManager.tasks.map(item => (
          <TaskСard key={item.id} name={item.name} pomodoros={item.pomodoros} />
        ))}
      </ul>
    </div>
  );
});
