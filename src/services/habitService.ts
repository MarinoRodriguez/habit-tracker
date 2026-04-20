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
  HabitWithStatus,
} from './types';
import { getCurrentPeriod } from './periodService';
import { sumLogValues, calculateStatus } from './evaluationService';

export interface IHabitService {
  getAllHabits(): Promise<Habit[]>;
  getHabitById(id: string): Promise<Habit | null>;
  createHabit(data: CreateHabitDTO): Promise<Habit>;
  updateHabit(data: UpdateHabitDTO): Promise<Habit>;
  deleteHabit(id: string): Promise<boolean>;

  getHabitLogs(habitId: string): Promise<HabitLog[]>;
  createHabitLog(data: CreateHabitLogDTO): Promise<HabitLog>;
  deleteHabitLog(id: string): Promise<boolean>;

  getHabitWithStatus(habitId: string): Promise<HabitWithStatus>;
  getAllHabitsWithStatus(): Promise<HabitWithStatus[]>;

  getAllGroups(): Promise<HabitGroup[]>;
  createGroup(data: CreateHabitGroupDTO): Promise<HabitGroup>;
  updateGroup(data: UpdateHabitGroupDTO): Promise<HabitGroup>;
  deleteGroup(id: string): Promise<boolean>;
  addHabitToGroup(groupId: string, habitId: string): Promise<void>;
  removeHabitFromGroup(groupId: string, habitId: string): Promise<void>;
}

export function createHabitService(
  habitRepo: IHabitRepository,
  logRepo: IHabitLogRepository,
  groupRepo: IHabitGroupRepository
): IHabitService {

  const getAllHabits = (): Promise<Habit[]> => habitRepo.getAll();

  const getHabitById = (id: string): Promise<Habit | null> => habitRepo.getById(id);

  const createHabit = (data: CreateHabitDTO): Promise<Habit> => habitRepo.create(data);

  const updateHabit = (data: UpdateHabitDTO): Promise<Habit> => habitRepo.update(data);

  const deleteHabit = (id: string): Promise<boolean> => habitRepo.delete(id);

  const getHabitLogs = (habitId: string): Promise<HabitLog[]> => logRepo.getByHabitId(habitId);

  const createHabitLog = (data: CreateHabitLogDTO): Promise<HabitLog> => logRepo.create(data);

  const deleteHabitLog = (id: string): Promise<boolean> => logRepo.delete(id);

  const getHabitWithStatus = async (habitId: string): Promise<HabitWithStatus> => {
    const habit = await habitRepo.getById(habitId);
    if (!habit) throw new Error(`Habit with id ${habitId} not found`);

    const period = getCurrentPeriod(habit.frequency, habit.timezone);
    const logs = await logRepo.getByHabitIdAndPeriod(habitId, period.start, period.end);
    const currentValue = sumLogValues(logs);
    const status = calculateStatus(currentValue, habit.goal, habit.type);

    return {
      ...habit,
      status,
      currentValue,
      periodStart: period.start,
      periodEnd: period.end,
    };
  };

  const getAllHabitsWithStatus = async (): Promise<HabitWithStatus[]> => {
    const habits = await habitRepo.getAll();
    const results: HabitWithStatus[] = [];

    for (const habit of habits) {
      const period = getCurrentPeriod(habit.frequency, habit.timezone);
      const logs = await logRepo.getByHabitIdAndPeriod(habit.id, period.start, period.end);
      const currentValue = sumLogValues(logs);
      const status = calculateStatus(currentValue, habit.goal, habit.type);

      results.push({
        ...habit,
        status,
        currentValue,
        periodStart: period.start,
        periodEnd: period.end,
      });
    }

    return results;
  };

  const getAllGroups = (): Promise<HabitGroup[]> => groupRepo.getAll();

  const createGroup = (data: CreateHabitGroupDTO): Promise<HabitGroup> => groupRepo.create(data);

  const updateGroup = (data: UpdateHabitGroupDTO): Promise<HabitGroup> => groupRepo.update(data);

  const deleteGroup = (id: string): Promise<boolean> => groupRepo.delete(id);

  const addHabitToGroup = (groupId: string, habitId: string): Promise<void> =>
    groupRepo.addHabitToGroup(groupId, habitId);

  const removeHabitFromGroup = (groupId: string, habitId: string): Promise<void> =>
    groupRepo.removeHabitFromGroup(groupId, habitId);

  return {
    getAllHabits,
    getHabitById,
    createHabit,
    updateHabit,
    deleteHabit,
    getHabitLogs,
    createHabitLog,
    deleteHabitLog,
    getHabitWithStatus,
    getAllHabitsWithStatus,
    getAllGroups,
    createGroup,
    updateGroup,
    deleteGroup,
    addHabitToGroup,
    removeHabitFromGroup,
  };
}

let habitServiceInstance: IHabitService | null = null;

export function getHabitService(): IHabitService {
  if (!habitServiceInstance) {
    throw new Error('HabitService not initialized. Call createHabitService first.');
  }
  return habitServiceInstance;
}

export function setHabitService(service: IHabitService): void {
  habitServiceInstance = service;
}
