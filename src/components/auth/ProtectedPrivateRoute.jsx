import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPrivateRoute = ({ redirectPath }) => {
  const sessionStatus = useSelector((state) => state.user);

  if (!sessionStatus) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedPrivateRoute;
