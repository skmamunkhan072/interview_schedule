import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import Error from "../../Share/Error/Error";
import Loading from "../../Share/Loading/Loading";

const EmployerRoute = ({ children }) => {
  const { user, loading, userRole } = useContext(AuthContext);

  // loading
  if ((loading, !userRole)) {
    return (
      <div className="flex justify-center items-center min-h-[37.8rem]">
        <Loading />
      </div>
    );
  }

  if (user) {
    if (userRole === "admin" || userRole === "employer") {
      return children;
    }
  }
  return <Error />;
};

export default EmployerRoute;
