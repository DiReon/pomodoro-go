import {IDay} from '../../../../interfaces/day.interface';
import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';

class Journal {
  days: IDay[] = [];
  today = new Date().toDateString();
  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {name: 'Journal', properties: ['days'], storage: window.localStorage});
    this.addMockData();
  }

  addMockData(): void {
    const date = new Date();
    const dayOfTheMonth = date.getDate();
    for (let i = 0; i < 21; i++) {
      date.setDate(dayOfTheMonth - 1 - i);
      const dateString = date.toDateString();
      const random = Math.random() * 10;
      const mockDay = {
        date: dateString,
        workTime: Math.round(25 * random),
        pomodoros: Math.round(random),
        breakTime: Math.round(5 * random),
        pausedTime: random * 5,
        stops: Math.round(random)
      };
      this.days.push(mockDay);
    }
  }

  get currentDay(): IDay {
    const currentDay = this.days.find(item => item?.date === this.today) as IDay;
    if (!currentDay) {
      this.addCurrentDay();
    }
    return this.days.find(item => item?.date === this.today) as IDay;
  }

  addCurrentDay() {
    const newDay = {
      date: this.today,
      workTime: 0,
      breakTime: 0,
      pomodoros: 0,
      pausedTime: 0,
      stops: 0
    };
    this.days = [...this.days, newDay];
  }

  addPomodoro(): void {
    if (this.currentDay) {
      this.currentDay.pomodoros = this.currentDay?.pomodoros ? this.currentDay?.pomodoros + 1 : 1;
    }
  }

  addWorkTime(): void {
    this.currentDay?.workTime ? this.currentDay.workTime++ : this.currentDay.workTime = 1;
  }

  addBreakTime(): void {
    this.currentDay?.breakTime ? this.currentDay.breakTime++ : this.currentDay.breakTime = 1;
  }

  addPausedTime(pausedTime: number): void {
    this.currentDay.pausedTime = this.currentDay?.pausedTime ? this.currentDay.pausedTime + pausedTime : pausedTime;
    this.currentDay.stops = this.currentDay.stops + 1;
  }
}
export const journal = new Journal();
