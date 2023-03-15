import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContextProvaider/AuthContextProvaider";
import Error from "../../../Share/Error/Error";
import Loading from "../../../Share/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading, setLoading, url, userRouteError, userRole } =
    useContext(AuthContext);

  // loading
  if ((loading, !userRole)) {
    return (
      <div className="flex justify-center items-center min-h-[37.8rem]">
        <Loading />
      </div>
    );
  }

  if (user && userRole === "admin") {
    return children;
  }
  return <Error />;
};

export default AdminRoute;
