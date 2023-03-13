import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import Error from "../../Share/Error/Error";
import Loading from "../../Share/Loading/Loading";

const UserRoute = ({ children }) => {
  const { user, loading, userRole } = useContext(AuthContext);

  // loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[37.8rem]">
        <Loading />
      </div>
    );
  }

  if (user) {
    if (userRole === "user" || userRole === "requestEmployer") {
      return children;
    }
  }
  return <Error />;
};

export default UserRoute;
