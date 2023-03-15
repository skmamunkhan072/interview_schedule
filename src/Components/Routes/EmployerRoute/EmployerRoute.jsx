import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import Error from "../../Share/Error/Error";
import Loading from "../../Share/Loading/Loading";

const EmployerRoute = ({ children }) => {
  const { user, loading, userRole, setLoading, setUserRole, url } =
    useContext(AuthContext);

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
