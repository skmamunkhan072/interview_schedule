import React, { useContext, useEffect } from "react";
import HomeBaner from "../../../../Assets/Img/HomeBaner.jpg";
import { AuthContext } from "../../../Context/AuthContextProvaider/AuthContextProvaider";

const Home = () => {
  const { setUserRole, setLoading, url, user } = useContext(AuthContext);
  return (
    <div className="py-5 w-full">
      <img src={HomeBaner} alt="Home Baner" className="w-full h-[564px]" />
    </div>
  );
};

export default Home;
