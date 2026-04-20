export type HabitStatus = "pending" | "completed" | "failed";

export const Frequency = {
  daily: "daily",
  weekly: "weekly",
  biweekly: "biweekly",
  monthly: "monthly",
  quarterly: "quarterly",
  four_months: "four_months",
  semiannual: "semiannual",
  yearly: "yearly",
} as const;

export type FrequencyValue = typeof Frequency[keyof typeof Frequency];

export type HabitType = "increase" | "decrease";

export interface Habit {
  id: string;
  name: string;
  frequency: FrequencyValue;
  goal: number;
  unit: string;
  type: HabitType;
  timezone: string;
  colorClass: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  timestamp: string;
  timezone: string;
  value: number;
  note?: string;
}

export interface HabitGroup {
  id: string;
  name: string;
  habitIds: string[];
}

export interface Period {
  start: Date;
  end: Date;
  frequency: FrequencyValue;
}

export type Page = "dashboard" | "details" | "create";
