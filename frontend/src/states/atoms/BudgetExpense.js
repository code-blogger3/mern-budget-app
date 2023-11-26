import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const BudgetState = atom({
  key: "Budgets",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
