import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import Loading from "../../Share/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, url, setUserRole, setLoading } =
    useContext(AuthContext);
  const location = useLocation();

  // Database User

  // loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[37.8rem]">
        <Loading />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
