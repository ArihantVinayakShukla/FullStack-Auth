import { useRecoilValue } from "recoil";
import { userStateSelector } from "../store/selectors";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useRecoilValue(userStateSelector);
  
  const isAuthenticated = user && (user.user || user._id);

  return isAuthenticated ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoute;