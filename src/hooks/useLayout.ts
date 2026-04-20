import { useOutletContext } from 'react-router-dom';
import type { HabitWithStatus } from '../services';

interface LayoutContext {
  habits: HabitWithStatus[];
  loading: boolean;
  logHabitId: string | null;
  setSearchParams: (params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => void;
  showFab: boolean;
  setShowFab: (show: boolean) => void;
}

export function useLayout() {
  return useOutletContext<LayoutContext>();
}
