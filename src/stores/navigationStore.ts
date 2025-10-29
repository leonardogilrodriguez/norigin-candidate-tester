import { create } from 'zustand';

interface NavigationState {
  activeRowIndex: number;
  activeColIndex: number;
  setActiveCell: (row: number, col: number) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeRowIndex: 0,
  activeColIndex: 0,

  setActiveCell: (row, col) => set({ activeRowIndex: row, activeColIndex: col }),
}));