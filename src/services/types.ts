import type { Habit, HabitLog, HabitGroup, FrequencyValue, HabitType, HabitStatus } from '../types';

export interface CreateHabitDTO {
  name: string;
  frequency: FrequencyValue;
  goal: number;
  unit: string;
  type: HabitType;
  timezone: string;
  colorClass: string;
}

export interface UpdateHabitDTO {
  id: string;
  name?: string;
  frequency?: FrequencyValue;
  goal?: number;
  unit?: string;
  type?: HabitType;
  timezone?: string;
  colorClass?: string;
}

export interface CreateHabitLogDTO {
  habitId: string;
  value: number;
  note?: string;
}

export interface CreateHabitGroupDTO {
  name: string;
  habitIds?: string[];
}

export interface UpdateHabitGroupDTO {
  id: string;
  name?: string;
  habitIds?: string[];
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface HabitWithStatus extends Habit {
  status: HabitStatus;
  currentValue: number;
  periodStart: Date;
  periodEnd: Date;
}

export interface IHabitRepository {
  getAll(options?: PaginationOptions): Promise<Habit[]>;
  getById(id: string): Promise<Habit | null>;
  create(data: CreateHabitDTO): Promise<Habit>;
  update(data: UpdateHabitDTO): Promise<Habit>;
  delete(id: string): Promise<boolean>;
}

export interface IHabitLogRepository {
  getByHabitId(habitId: string, options?: PaginationOptions): Promise<HabitLog[]>;
  getByHabitIdAndPeriod(habitId: string, start: Date, end: Date): Promise<HabitLog[]>;
  create(data: CreateHabitLogDTO): Promise<HabitLog>;
  delete(id: string): Promise<boolean>;
}

export interface IHabitGroupRepository {
  getAll(): Promise<HabitGroup[]>;
  getById(id: string): Promise<HabitGroup | null>;
  create(data: CreateHabitGroupDTO): Promise<HabitGroup>;
  update(data: UpdateHabitGroupDTO): Promise<HabitGroup>;
  delete(id: string): Promise<boolean>;
  addHabitToGroup(groupId: string, habitId: string): Promise<void>;
  removeHabitFromGroup(groupId: string, habitId: string): Promise<void>;
}
