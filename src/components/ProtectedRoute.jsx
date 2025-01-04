/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Error404 from "./common/Error404";

const ProtectedRoute = ({
  children,
  allowedUserTypes = ["teacher", "student"],
}) => {
  const userData = Cookies.get("userData");
  const user = userData ? JSON.parse(userData) : null;

  // If there's no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedUserTypes is specified, check if user's type is allowed
  if (
    allowedUserTypes.length > 0 &&
    !allowedUserTypes.includes(user.userType)
  ) {
    // return <Navigate to="/" replace />;
    return <Error404 />;
  }

  return children;
};

export default ProtectedRoute;
