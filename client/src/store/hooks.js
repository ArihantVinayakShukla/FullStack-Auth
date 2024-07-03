import { useSetRecoilState } from "recoil";
import { errorAtom, loadingAtom, userAtom } from "./atoms";

const useSignInActions = () => {
  const setUser = useSetRecoilState(userAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const setError = useSetRecoilState(errorAtom);

  return {
    signInStart: () => setLoading(true),
    signInSuccess: (userData) => {
      setUser(userData);
      setLoading(false);
      setError(null);
    },
    signInFailure: (errorMessage) => {
      setLoading(false);
      setError(errorMessage);
    },
    updateUserStart: () => setLoading(true),
    updateUserSuccess: (userData) => {
      setUser(userData);
      setLoading(false);
      setError(false);
    },
    updateUserFailure: (errorMessage) => {
      setLoading(false);
      setError(errorMessage);
    },
    deleteUserStart: () => setLoading(true),
    deleteUserSuccess: () => {
      setUser(null);
      setLoading(false);
      setError(false);
    },
    deleteUserFailure: (errorMessage) => {
      setLoading(false);
      setError(errorMessage);
    },
  };
};

export { useSignInActions };
