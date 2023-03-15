import { Avatar } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";

const SelectAllInterviewUser = () => {
  const { url, loading, setLoading, setUserRole, user } =
    useContext(AuthContext);
  const [selectAllInterviews, setSelectAllInterview] = useState([]);

  // SelectAllInterviewUser
  useEffect(() => {
    fetch(`${url}select-all-interview-user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
    })
      .then((res) => res.json())
      .then((interviewers) => {
        if (interviewers) {
          console.log(interviewers);
          setSelectAllInterview(interviewers);
        } else {
          setLoading(false);
        }
      });
  }, [url, user]);
  return (
    <div className="pt-10">
      <h1 className="text-2xl">Select All Interview User</h1>
      {selectAllInterviews.length ? (
        <div className="py-20 flex justify-start">
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
            {selectAllInterviews.map((user) => (
              <div key={user?._id}>
                <div className="flex justify-between items-center px-10 py-5 rounded-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex">
                    <Avatar
                      alt="User settings"
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      rounded={true}
                    />
                    <div className="ml-5">
                      <p className="text-xl text-start">{user?.name}</p>
                      <p className="text-start">{user?.email}</p>
                    </div>
                    <div className="ml-5">
                      <p className="text-start">{user?.interviewType}</p>
                      <p className="text-start">
                        {user?.bookingtime} {user?.bookingDate}
                      </p>
                    </div>
                  </div>
                  <div className="ml-20">
                    <p>User</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className=" h-[400px] mt-5 flex justify-center items-center">
          <h1 className="text-3xl">No Data Found</h1>
        </div>
      )}
    </div>
  );
};

export default SelectAllInterviewUser;
