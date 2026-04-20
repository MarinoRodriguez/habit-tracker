import type { Habit, HabitLog, HabitType, HabitStatus } from '../types';
import type { HabitWithStatus } from './types';
import { getCurrentPeriod, isLogWithinPeriod } from './periodService';

export function sumLogValues(logs: HabitLog[]): number {
  return logs.reduce((sum, log) => sum + log.value, 0);
}

export function evaluateHabit(
  currentValue: number,
  goal: number,
  type: HabitType
): boolean {
  if (type === "increase") {
    return currentValue >= goal;
  }
  return currentValue <= goal;
}

export function calculateStatus(
  currentValue: number,
  goal: number,
  type: HabitType
): HabitStatus {
  if (evaluateHabit(currentValue, goal, type)) {
    return "completed";
  }
  if (currentValue === 0) {
    return "pending";
  }
  if (type === "increase" && currentValue > 0) {
    return "pending";
  }
  return "failed";
}

export function getHabitWithStatus(
  habit: Habit,
  logs: HabitLog[]
): HabitWithStatus {
  const period = getCurrentPeriod(habit.frequency, habit.timezone);
  const periodLogs = logs.filter(log =>
    isLogWithinPeriod(log.timestamp, period)
  );
  const currentValue = sumLogValues(periodLogs);
  const status = calculateStatus(currentValue, habit.goal, habit.type);

  return {
    ...habit,
    status,
    currentValue,
    periodStart: period.start,
    periodEnd: period.end,
  };
}

export function getHabitStatusFromLogs(
  habit: Habit,
  logs: HabitLog[]
): HabitStatus {
  const period = getCurrentPeriod(habit.frequency, habit.timezone);
  const periodLogs = logs.filter(log =>
    isLogWithinPeriod(log.timestamp, period)
  );
  const currentValue = sumLogValues(periodLogs);
  return calculateStatus(currentValue, habit.goal, habit.type);
}

export function getCurrentValueFromLogs(
  habit: Habit,
  logs: HabitLog[]
): number {
  const period = getCurrentPeriod(habit.frequency, habit.timezone);
  const periodLogs = logs.filter(log =>
    isLogWithinPeriod(log.timestamp, period)
  );
  return sumLogValues(periodLogs);
}

export function formatPeriodRange(period: { start: Date; end: Date }): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  const startStr = period.start.toLocaleDateString(undefined, options);
  const endStr = period.end.toLocaleDateString(undefined, {
    ...options,
    year: 'numeric',
  });

  return `${startStr} - ${endStr}`;
}
