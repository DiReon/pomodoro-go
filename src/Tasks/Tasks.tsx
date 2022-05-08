import React, {FormEvent, useRef} from 'react';
import './tasks.css';

export function Tasks() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    console.log(inputRef.current?.value);
    event.preventDefault();
  }
  return (
    <div className={'tasks-container'}>
      <h3>Ура! Теперь можно начать работать:</h3>
      <ul>
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
    </div>
  );
}
