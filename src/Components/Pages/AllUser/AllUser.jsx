import { Avatar, Button, Card } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";

const AllUser = () => {
  const { url, loading, setLoading } = useContext(AuthContext);
  const [allUser, setAllUser] = useState([]);
  const [requestEmployerAccept, seTrequestEmployerAccept] = useState(false);

  // all user
  useEffect(() => {
    setLoading(true);
    fetch(`${url}all-user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
    })
      .then((res) => res.json())
      .then((users) => {
        if (users) {
          console.log(users);
          setAllUser(users);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [url, requestEmployerAccept]);

  //   employerRequestAccept
  const employerRequestAccept = (id) => {
    fetch(`${url}employer-request-accept`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user?.acknowledged) {
          seTrequestEmployerAccept(!requestEmployerAccept);
          toast.success("🦄 Sing up successful!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };

  return (
    <div className="pt-10">
      <h1 className="text-2xl">All User</h1>
      {allUser.length ? (
        <div className="py-20 flex justify-start">
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
            {allUser.map((user) => (
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
                  </div>
                  <div className="ml-20">
                    {user?.role && user?.role === "user" && <p>User</p>}
                    {user?.role && user?.role === "employer" && <p>employer</p>}
                    {user?.role && user?.role === "requestEmployer" && (
                      <Button onClick={() => employerRequestAccept(user?._id)}>
                        request Employer
                      </Button>
                    )}
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

export default AllUser;
