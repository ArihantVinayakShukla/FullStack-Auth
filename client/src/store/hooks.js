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
  };
};

export { useSignInActions };
