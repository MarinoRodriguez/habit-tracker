import type { Habit, HabitLog, HabitGroup } from '../types';
import type {
  IHabitRepository,
  IHabitLogRepository,
  IHabitGroupRepository,
  CreateHabitDTO,
  UpdateHabitDTO,
  CreateHabitLogDTO,
  CreateHabitGroupDTO,
  UpdateHabitGroupDTO,
  PaginationOptions,
} from './types';

const STORAGE_KEYS = {
  HABITS: 'habit_tracker_habits',
  LOGS: 'habit_tracker_logs',
  GROUPS: 'habit_tracker_groups',
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function delay(ms: number = 100): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class LocalStorageHabitRepository implements IHabitRepository {
  private getHabits(): Habit[] {
    const stored = localStorage.getItem(STORAGE_KEYS.HABITS);
    return stored ? JSON.parse(stored) : [];
  }

  private setHabits(habits: Habit[]): void {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  }

  async getAll(options?: PaginationOptions): Promise<Habit[]> {
    await delay();
    const habits = this.getHabits();
    const limit = options?.limit ?? 50;
    return habits.slice(0, limit);
  }

  async getById(id: string): Promise<Habit | null> {
    await delay();
    const habits = this.getHabits();
    return habits.find(h => h.id === id) ?? null;
  }

  async create(data: CreateHabitDTO): Promise<Habit> {
    await delay();
    const habits = this.getHabits();
    const newHabit: Habit = {
      id: generateId(),
      name: data.name,
      frequency: data.frequency,
      goal: data.goal,
      unit: data.unit,
      type: data.type,
      timezone: data.timezone,
      colorClass: data.colorClass,
    };
    habits.push(newHabit);
    this.setHabits(habits);
    return newHabit;
  }

  async update(data: UpdateHabitDTO): Promise<Habit> {
    await delay();
    const habits = this.getHabits();
    const index = habits.findIndex(h => h.id === data.id);
    if (index === -1) throw new Error(`Habit with id ${data.id} not found`);

    const updatedHabit = { ...habits[index], ...data };
    habits[index] = updatedHabit;
    this.setHabits(habits);
    return updatedHabit;
  }

  async delete(id: string): Promise<boolean> {
    await delay();
    const habits = this.getHabits();
    const filtered = habits.filter(h => h.id !== id);
    if (filtered.length === habits.length) return false;
    this.setHabits(filtered);
    return true;
  }

  seedInitialData(): void {
    const habits = this.getHabits();
    if (habits.length === 0) {
      const initialHabits: Habit[] = [
        {
          id: '1',
          name: 'Morning Hydration',
          frequency: 'daily',
          goal: 8,
          unit: 'vasos',
          type: 'increase',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          colorClass: 'bg-secondary-container',
        },
        {
          id: '2',
          name: 'Mindful Coding',
          frequency: 'daily',
          goal: 5,
          unit: 'pomodoros',
          type: 'increase',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          colorClass: 'bg-primary-fixed',
        },
        {
          id: '3',
          name: 'Digital Detox',
          frequency: 'daily',
          goal: 4,
          unit: 'horas',
          type: 'decrease',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          colorClass: 'bg-tertiary-container',
        },
        {
          id: '4',
          name: 'Afternoon Walk',
          frequency: 'daily',
          goal: 10000,
          unit: 'pasos',
          type: 'increase',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          colorClass: 'bg-primary-fixed',
        },
      ];
      this.setHabits(initialHabits);
    }
  }
}

export class LocalStorageHabitLogRepository implements IHabitLogRepository {
  private getLogs(): HabitLog[] {
    const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
    return stored ? JSON.parse(stored) : [];
  }

  private setLogs(logs: HabitLog[]): void {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  }

  async getByHabitId(habitId: string, options?: PaginationOptions): Promise<HabitLog[]> {
    await delay();
    const logs = this.getLogs().filter(l => l.habitId === habitId);
    const limit = options?.limit ?? 50;
    return logs.slice(0, limit);
  }

  async getByHabitIdAndPeriod(habitId: string, start: Date, end: Date): Promise<HabitLog[]> {
    await delay();
    const logs = this.getLogs().filter(l => {
      if (l.habitId !== habitId) return false;
      const logDate = new Date(l.timestamp);
      return logDate >= start && logDate <= end;
    });
    return logs;
  }

  async create(data: CreateHabitLogDTO): Promise<HabitLog> {
    await delay();
    const logs = this.getLogs();
    const newLog: HabitLog = {
      id: generateId(),
      habitId: data.habitId,
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      value: data.value,
      note: data.note,
    };
    logs.push(newLog);
    this.setLogs(logs);
    return newLog;
  }

  async delete(id: string): Promise<boolean> {
    await delay();
    const logs = this.getLogs();
    const filtered = logs.filter(l => l.id !== id);
    if (filtered.length === logs.length) return false;
    this.setLogs(filtered);
    return true;
  }

  seedInitialData(): void {
    const logs = this.getLogs();
    if (logs.length === 0) {
      const now = new Date();
      const initialLogs: HabitLog[] = [
        { id: 'a1', habitId: '1', timestamp: new Date(now.getTime() - 3600000 * 4).toISOString(), timezone: 'UTC', value: 1, note: 'Morning Routine' },
        { id: 'a2', habitId: '1', timestamp: new Date(now.getTime() - 3600000 * 2).toISOString(), timezone: 'UTC', value: 2, note: 'Post-Workout' },
        { id: 'a3', habitId: '1', timestamp: new Date(now.getTime() - 3600000).toISOString(), timezone: 'UTC', value: 1, note: 'Lunch' },
        { id: 'b1', habitId: '2', timestamp: new Date(now.getTime() - 3600000 * 3).toISOString(), timezone: 'UTC', value: 1, note: 'Deep Work' },
        { id: 'c1', habitId: '3', timestamp: new Date(now.getTime() - 3600000 * 5).toISOString(), timezone: 'UTC', value: 2, note: 'Screen time' },
      ];
      this.setLogs(initialLogs);
    }
  }
}

export class LocalStorageHabitGroupRepository implements IHabitGroupRepository {
  private getGroups(): HabitGroup[] {
    const stored = localStorage.getItem(STORAGE_KEYS.GROUPS);
    return stored ? JSON.parse(stored) : [];
  }

  private setGroups(groups: HabitGroup[]): void {
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
  }

  async getAll(): Promise<HabitGroup[]> {
    await delay();
    return this.getGroups();
  }

  async getById(id: string): Promise<HabitGroup | null> {
    await delay();
    const groups = this.getGroups();
    return groups.find(g => g.id === id) ?? null;
  }

  async create(data: CreateHabitGroupDTO): Promise<HabitGroup> {
    await delay();
    const groups = this.getGroups();
    const newGroup: HabitGroup = {
      id: generateId(),
      name: data.name,
      habitIds: data.habitIds ?? [],
    };
    groups.push(newGroup);
    this.setGroups(groups);
    return newGroup;
  }

  async update(data: UpdateHabitGroupDTO): Promise<HabitGroup> {
    await delay();
    const groups = this.getGroups();
    const index = groups.findIndex(g => g.id === data.id);
    if (index === -1) throw new Error(`Group with id ${data.id} not found`);

    const updatedGroup = { ...groups[index], ...data };
    groups[index] = updatedGroup;
    this.setGroups(groups);
    return updatedGroup;
  }

  async delete(id: string): Promise<boolean> {
    await delay();
    const groups = this.getGroups();
    const filtered = groups.filter(g => g.id !== id);
    if (filtered.length === groups.length) return false;
    this.setGroups(filtered);
    return true;
  }

  async addHabitToGroup(groupId: string, habitId: string): Promise<void> {
    await delay();
    const groups = this.getGroups();
    const index = groups.findIndex(g => g.id === groupId);
    if (index === -1) throw new Error(`Group with id ${groupId} not found`);

    if (!groups[index].habitIds.includes(habitId)) {
      groups[index].habitIds.push(habitId);
      this.setGroups(groups);
    }
  }

  async removeHabitFromGroup(groupId: string, habitId: string): Promise<void> {
    await delay();
    const groups = this.getGroups();
    const index = groups.findIndex(g => g.id === groupId);
    if (index === -1) throw new Error(`Group with id ${groupId} not found`);

    groups[index].habitIds = groups[index].habitIds.filter(id => id !== habitId);
    this.setGroups(groups);
  }
}

export const habitRepository = new LocalStorageHabitRepository();
export const habitLogRepository = new LocalStorageHabitLogRepository();
export const habitGroupRepository = new LocalStorageHabitGroupRepository();
