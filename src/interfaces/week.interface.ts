export interface IWeekData {
  value: number;
  caption: string;
}

export interface IWeek {
  thisWeek: IWeekData;
  previousWeek: IWeekData;
  twoWeeksBefore: IWeekData;
}

export interface IWeekDay {
  longName: string;
  shortName: string;
}