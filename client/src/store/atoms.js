import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom }  = recoilPersist();

const userAtom = atom({
  key: "userAtom",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const loadingAtom = atom({
  key: "loadingAtom",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

const errorAtom = atom({
  key: "errorAtom",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export { userAtom, loadingAtom, errorAtom };
