import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isUserLogin = atom({
  key: "Login",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
