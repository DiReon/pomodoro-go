import {ITask} from '../../../../interfaces/task.interface';
import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';

class TaskManager {
  tasks: ITask[] = [];
  constructor() {
    makeAutoObservable(this);

    makePersistable(this, { name: 'TasksStore', properties: ['tasks'], storage: window.localStorage });
  }

  addTask(task: ITask) {
    this.tasks = [...this.tasks, task];
  }

  updateTask(task: ITask) {
    const index = this.tasks.findIndex(item => item.id === task.id);
    this.tasks.splice(index, 1, task);
  }

  deleteTask(task: ITask) {
    this.tasks = this.tasks.filter(item => item.id !== task.id);
  }
}
export const taskManager = new TaskManager();
