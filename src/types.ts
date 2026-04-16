export type HabitStatus = "fulfilled" | "pending" | "failed";

export enum Frecuency {
  daily,
  weekly,
  biweekly,
  monthly,
  quarterly,
  four_months,
  semiannual,
  yearly,
}
export interface Habit {
  id: string;
  name: string;
  status: HabitStatus;
  current: number;
  goal: number;
  unit: string;
  colorClass: string;
  progress: number;
}

export interface Activity {
  id: string;
  habitId: string;
  name: string;
  amount: number;
  unit: string;
  time: string;
  note?: string;
}

export type Page = "dashboard" | "details" | "create";
