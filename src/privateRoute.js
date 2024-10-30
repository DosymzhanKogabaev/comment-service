import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = { loggedIn: localStorage.getItem("access_token") };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoutes;