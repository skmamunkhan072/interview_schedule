import { Button } from "flowbite-react";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import { useToken } from "../../Hooks/UseToken/UseToken";
import SmallSpinner from "../SmallSpinner/SmallSpinner";

const SingUp = () => {
  const {
    loading,
    setLoading,
    handelUserCreate,
    updateUser,
    url,
    userRouteError,
    setUserRouteError,
    setDatabaseUser,
    setUserRole,
  } = useContext(AuthContext);
  const [errorMessage, SetErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [token] = useToken(userEmail);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //   handel singup
  const handelUsersingUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const role = "user";
    fetch(`${url}create-user-database`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
      body: JSON.stringify({ email, name, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetErrorMessage(data?.messge);
        if (data?.acknowledged) {
          handelUserCreate(email, password)
            .then((result) => {
              const user = result.user;
              if (user) {
                setUserEmail(user?.email);
                const updeInfo = {
                  displayName: name,
                };
                updateUser(updeInfo)
                  .then((userCredential) => {
                    console.log(user);
                    // setUserRouteError(!userRouteError);
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
                  })
                  .catch((error) => {
                    const errorMessage = error.message;
                    toast.error("🦄 error", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
                    setLoading(false);
                  });
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              const message = errorMessage.split(":")[1];
              if (message) {
                SetErrorMessage(message);
                setLoading(false);
                toast.error(`🦄 ${message}`, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            });
        }
      });
  };

  // navigate
  if (token) {
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
    navigate(from, { replace: true });
  }

  return (
    <section>
      <div className="pt-20">
        <form
          onSubmit={handelUsersingUp}
          className="w-full md:w-1/2 lg:w-1/2 mx-auto mt-3 py-5 text-start px-5 border border-gray-500 rounded-lg"
        >
          <h1 className="text-center text-2xl font-bold text-gray-400 mb-5">
            Sing Up
          </h1>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="name"
              id="floating_repeat_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="floating_repeat_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Name
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="email"
              name="email"
              id="floating_repeat_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_repeat_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email
            </label>
          </div>
          <div className="relative z-0  w-full group">
            <input
              type="password"
              name="password"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your password
            </label>
          </div>
          <p className="mb-6 text-red-500">{errorMessage}</p>

          <div className="flex justify-start items-center">
            {loading ? (
              <Button gradientDuoTone="purpleToPink" className="mt-5">
                <SmallSpinner />
              </Button>
            ) : (
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                className="px-6 py-1 mt-5"
              >
                Sing Up
              </Button>
            )}
          </div>
          <div>
            <p className="mt-3">
              If you don't have an account
              <Link className="text-emerald-500	ml-3" to="/login">
                Login
              </Link>
            </p>
            <small className="text-start mt-2 text-teal-400 cursor-pointer	">
              Forgot Password ?
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SingUp;
