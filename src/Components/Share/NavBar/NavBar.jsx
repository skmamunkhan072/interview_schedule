import { Avatar, Card, Dropdown, Navbar } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import Logo from "../../../Assets/Img/Logo.png";

// React icoms
import { CiDark } from "react-icons/ci";
import { BsSun } from "react-icons/bs";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const NavBar = () => {
  const {
    handelSingOutUser,
    user,
    setUserRole,
    changeTheme,
    themValue,
    userRole,
    url,
    userRouteError,
    setUserRouteError,

    setLoading,
  } = useContext(AuthContext);
  const [showDropdrownMenuw, setShowDropdrownMenuw] = useState(false);
  const [databaseUser, setDatabaseUser] = useState("");

  // requestEmployer
  const requestEmployer = () => {
    fetch(`${url}request-employer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
    })
      .then((res) => res.json())
      .then((users) => {
        if (users) {
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

  useEffect(() => {
    setLoading(true);
    fetch(`${url}database-user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
    })
      .then((res) => res.json())
      .then((role) => {
        console.log(role?.role);
        if (role?.role) {
          setDatabaseUser(role?.role);
          setUserRole(role?.role);
        }
        setLoading(false);
      });
  }, [user, userRouteError, databaseUser]);
  console.log(databaseUser);

  const handelUserLogOut = () => {
    handelSingOutUser()
      .then(() => {
        localStorage.removeItem("access_Token");
        console.log("out");
        toast.success("🦄 Sing Out successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        localStorage.removeItem("access_Token");
        setUserRole("user");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="nav_bar_wraper relative">
      <Navbar fluid={true} rounded={false}>
        <Navbar.Brand href="#">
          <Avatar alt="User settings" img={Logo} rounded={true} />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-2">
            Interview Schedule
          </span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse id="nav_link_wraper">
          <Navbar.Link href="/" active={true}>
            Home
          </Navbar.Link>

          {databaseUser ? (
            <>
              {databaseUser && databaseUser === "admin" && (
                <>
                  <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
                  <Navbar.Link href="/Interview-Mont">
                    Interview Mont
                  </Navbar.Link>
                  <Navbar.Link href="/all-user">All User</Navbar.Link>
                  <Navbar.Link href="/select-all-interview-user">
                    Select All Interview User
                  </Navbar.Link>
                </>
              )}
            </>
          ) : (
            <>
              {userRole && userRole === "admin" && (
                <>
                  <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
                  <Navbar.Link href="/Interview-Mont">
                    Interview Mont
                  </Navbar.Link>
                  <Navbar.Link href="/all-user">All User</Navbar.Link>
                  <Navbar.Link href="/select-all-interview-user">
                    Select All Interview User
                  </Navbar.Link>
                </>
              )}
            </>
          )}

          {databaseUser ? (
            <>
              {databaseUser && databaseUser === "employer" && (
                <>
                  <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
                  <Navbar.Link href="/Interview-Mont">
                    Interview Mont
                  </Navbar.Link>
                  <Navbar.Link href="/select-all-interview-user">
                    Select All Interview User
                  </Navbar.Link>
                </>
              )}
            </>
          ) : (
            <>
              {userRole && userRole === "employer" && (
                <>
                  <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
                  <Navbar.Link href="/Interview-Mont">
                    Interview Mont
                  </Navbar.Link>
                  <Navbar.Link href="/select-all-interview-user">
                    Select All Interview User
                  </Navbar.Link>
                </>
              )}
            </>
          )}
          {databaseUser ? (
            <>
              {databaseUser && databaseUser === "user" && (
                <>
                  <Navbar.Link href="/interview_schedule">
                    Interview Schedule
                  </Navbar.Link>
                  <Navbar.Link href="/booking-interview">
                    Booking Interview
                  </Navbar.Link>
                </>
              )}
            </>
          ) : (
            <>
              {userRole && userRole === "user" && (
                <>
                  <Navbar.Link href="/interview_schedule">
                    Interview Schedule
                  </Navbar.Link>
                  <Navbar.Link href="/booking-interview">
                    Booking Interview
                  </Navbar.Link>
                </>
              )}
            </>
          )}

          {databaseUser && databaseUser === "requestEmployer" && (
            <>
              <Navbar.Link href="/interview_schedule">
                Interview Schedule
              </Navbar.Link>
              <Navbar.Link href="/booking-interview">
                Booking Interview
              </Navbar.Link>
            </>
          )}

          {user ? (
            ""
          ) : (
            <>
              <Navbar.Link href="/login">Login</Navbar.Link>
              <Navbar.Link href="/sing-up">sing Up</Navbar.Link>
            </>
          )}

          <div className="cursor-pointer">
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
              onClick={() => setShowDropdrownMenuw(!showDropdrownMenuw)}
            />
          </div>
          {showDropdrownMenuw && (
            <div
              className="block max-w-sm  border border-gray-200 rounded-md shadow bg-gray-50  dark:border-gray-700 dark:bg-gray-700 absolute right-5 top-16"
              onClick={() => setShowDropdrownMenuw(false)}
            >
              <div>
                <Dropdown.Header>
                  <span className="block text-sm">
                    {user ? user?.displayName : "Sk Mamun Khan"}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {user ? user?.email : "mam@gmail"}
                  </span>
                </Dropdown.Header>
                {databaseUser === "user" && (
                  <Dropdown.Item onClick={() => requestEmployer()}>
                    Request Employer
                  </Dropdown.Item>
                )}
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                {user?.email && (
                  <Dropdown.Item onClick={() => handelUserLogOut()}>
                    Sign out
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={changeTheme}>
                  {themValue ? (
                    <span className="flex justify-center items-center">
                      Light <BsSun className="them_icon ml-2" />
                    </span>
                  ) : (
                    <span className="flex justify-center items-center">
                      Dark <CiDark className="them_icon ml-2" />
                    </span>
                  )}
                </Dropdown.Item>
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
