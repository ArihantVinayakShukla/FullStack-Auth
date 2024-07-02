import { selector } from "recoil";
import { userAtom, loadingAtom, errorAtom } from "./atoms";

const userStateSelector = selector({
  key: "userStateSelector",
  get: ({ get }) => ({
    user: get(userAtom),
    loading: get(loadingAtom),
    error: get(errorAtom),
  }),
});

export { userStateSelector };
