import { create } from "zustand";

interface BudgetState {
  newBudget: number | null;
  setNewBudget: (budget: number | null) => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  newBudget: null,
  setNewBudget: (budget) => set({ newBudget: budget }),
}));
