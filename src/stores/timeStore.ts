import { create } from 'zustand';
import { totalMinutesFromMidnight } from '../utils/dates';

type TimeStore = {
  currentMinute: number;
}

export const useTimeStore = create<TimeStore>(() => {
  const now = totalMinutesFromMidnight();

  const tick = () => {
    const next = totalMinutesFromMidnight();
    if (next !== useTimeStore.getState().currentMinute) {
      useTimeStore.setState({ currentMinute: next });
    }
  };

  const store = { currentMinute: now };
  const intervalId: NodeJS.Timeout = setInterval(tick, 60000);

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => clearInterval(intervalId));
  }

  return store;
})