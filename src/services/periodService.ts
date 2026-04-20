import type { FrequencyValue, Period } from '../types';

export function getCurrentPeriod(frequency: FrequencyValue, timezone: string): Period {
  const now = new Date();
  const tzOffset = getTimezoneOffset(timezone);
  const localDate = new Date(now.getTime() + tzOffset);

  const year = localDate.getFullYear();
  const month = localDate.getMonth();
  const date = localDate.getDate();
  const dayOfWeek = localDate.getDay();

  let start: Date;
  let end: Date;

  switch (frequency) {
    case "daily":
      start = new Date(year, month, date, 0, 0, 0, 0);
      end = new Date(year, month, date, 23, 59, 59, 999);
      break;

    case "weekly": {
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      start = new Date(year, month, date + mondayOffset, 0, 0, 0, 0);
      end = new Date(year, month, date + mondayOffset + 6, 23, 59, 59, 999);
      break;
    }

    case "biweekly": {
      const weekNumber = getWeekNumber(localDate);
      const biweekNumber = Math.floor(weekNumber / 2);
      const biweekStart = getDateOfWeek(biweekNumber * 2, year);
      start = new Date(biweekStart.year, biweekStart.month, biweekStart.date, 0, 0, 0, 0);
      end = new Date(biweekStart.year, biweekStart.month, biweekStart.date + 13, 23, 59, 59, 999);
      break;
    }

    case "monthly":
      start = new Date(year, month, 1, 0, 0, 0, 0);
      end = new Date(year, month + 1, 0, 23, 59, 59, 999);
      break;

    case "quarterly": {
      const quarterMonth = Math.floor(month / 3) * 3;
      start = new Date(year, quarterMonth, 1, 0, 0, 0, 0);
      end = new Date(year, quarterMonth + 3, 0, 23, 59, 59, 999);
      break;
    }

    case "four_months": {
      const fourMonthPeriod = Math.floor(month / 4) * 4;
      start = new Date(year, fourMonthPeriod, 1, 0, 0, 0, 0);
      end = new Date(year, fourMonthPeriod + 4, 0, 23, 59, 59, 999);
      break;
    }

    case "semiannual": {
      const halfYearMonth = month < 6 ? 0 : 6;
      start = new Date(year, halfYearMonth, 1, 0, 0, 0, 0);
      end = new Date(year, halfYearMonth + 6, 0, 23, 59, 59, 999);
      break;
    }

    case "yearly":
      start = new Date(year, 0, 1, 0, 0, 0, 0);
      end = new Date(year, 11, 31, 23, 59, 59, 999);
      break;

    default:
      start = new Date(year, month, date, 0, 0, 0, 0);
      end = new Date(year, month, date, 23, 59, 59, 999);
  }

  return {
    start: new Date(start.getTime() - tzOffset),
    end: new Date(end.getTime() - tzOffset),
    frequency,
  };
}

function getTimezoneOffset(timezone: string): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    });
    const parts = formatter.formatToParts(new Date());
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    if (tzPart) {
      const offset = tzPart.value;
      const match = offset.match(/GMT([+-])(\d{1,2})/);
      if (match) {
        const sign = match[1] === '+' ? 1 : -1;
        const hours = parseInt(match[2], 10);
        return sign * hours * 60 * 60 * 1000;
      }
    }
  } catch {
    // fallback to local
  }
  return new Date().getTimezoneOffset() * -60 * 1000;
}

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

function getDateOfWeek(week: number, year: number): { year: number; month: number; date: number } {
  const startOfYear = new Date(year, 0, 1);
  const daysOffset = (week - 1) * 7;
  const firstDay = startOfYear.getDay();
  const daysToMonday = firstDay === 0 ? 6 : firstDay - 1;
  const targetDate = new Date(year, 0, daysOffset + daysToMonday + 1);
  return {
    year: targetDate.getFullYear(),
    month: targetDate.getMonth(),
    date: targetDate.getDate(),
  };
}

export function isLogWithinPeriod(logTimestamp: string, period: Period): boolean {
  const logDate = new Date(logTimestamp);
  return logDate >= period.start && logDate <= period.end;
}

export function getFrequencyLabel(frequency: FrequencyValue): string {
  const labels: Record<FrequencyValue, string> = {
    daily: 'Diario',
    weekly: 'Semanal',
    biweekly: 'Quincenal',
    monthly: 'Mensual',
    quarterly: 'Trimestral',
    four_months: 'Cuatrimestral',
    semiannual: 'Semestral',
    yearly: 'Anual',
  };
  return labels[frequency];
}

export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
