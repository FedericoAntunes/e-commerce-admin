import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedPublicRoute({ redirectPath }) {
  const sessionStatus = useSelector((state) => state.user);

  if (sessionStatus) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}
