import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../Share/NavBar/NavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="dark:bg-gray-900 lg:py-10">
        <div className="max-w-[1450px] min-h-[37.8rem] dark:bg-gray-800 dark:text-white mx-auto px-5 rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
