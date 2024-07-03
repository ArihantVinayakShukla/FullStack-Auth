import { useRecoilValue } from "recoil";
import { userStateSelector } from "../store/selectors";
import { Outlet, Navigate } from "react-router-dom";


const PrivateRoute = () => {
  const { user } = useRecoilValue(userStateSelector);
  const currentUser = user?.user;

  return (
    currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
  )
}

export default PrivateRoute