import { Card } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import Loading from "../../Share/Loading/Loading";
import { FaLongArrowAltRight } from "react-icons/fa";

const BookingInterview = () => {
  const { url, loading, user } = useContext(AuthContext);
  const [myInterviewBooking, setMyInterviewBooking] = useState([]);
  const [meetLink, setMeetLink] = useState([]);
  useEffect(() => {
    fetch(`${url}my-interview-booking-data`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.message) {
          setMyInterviewBooking(data);
          for (const Link of data) {
            setMeetLink(Link?.MeetLink);
          }
          console.log(data);
        }
      });
  }, [url]);

  // console.log(meetLink);

  // cancelInterview
  const cancelInterview = () => {
    fetch(`${url}my-interview-booking-data`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          toast.success("🦄 your Interview is cancel!", {
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
        setMyInterviewBooking([]);
        console.log(data);
      });
  };

  // loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[37.8rem]">
        <Loading />
      </div>
    );
  }
  return (
    <div className="py-10">
      <h1 className="text-2xl">This is my BookingInterview</h1>
      {myInterviewBooking.length ? (
        <div className=" mt-5 md:mx-20">
          <Card>
            <div className="pb-10">
              <div className="md:flex justify-start items-center">
                <div className="mr-10">
                  <img
                    className="mb-3 h-24 w-24 rounded-full shadow-lg"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="User Img"
                  />
                </div>

                <div className="flex">
                  <ul>
                    <li className="mb-1 text-xl font-medium text-gray-900 dark:text-white text-start">
                      Name
                    </li>
                    <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                      Email
                    </li>
                    <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                      Position
                    </li>
                    <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                      Join Time
                    </li>
                    <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                      Time Zoon
                    </li>
                    <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                      Interview Type
                    </li>
                    <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                      Duration
                    </li>
                  </ul>
                  <ul>
                    <li className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      <FaLongArrowAltRight className="mt-2 mx-2" />
                    </li>
                    <li className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      <FaLongArrowAltRight className="mt-2 mx-2" />
                    </li>
                    <li className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      <FaLongArrowAltRight className="mt-2 mx-2" />
                    </li>
                    <li className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      <FaLongArrowAltRight className="mt-2 mx-2" />
                    </li>
                    <li className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      <FaLongArrowAltRight className="mt-2 mx-2" />
                    </li>
                    <li className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      <FaLongArrowAltRight className="mt-2 mx-2" />
                    </li>
                    <li className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      <FaLongArrowAltRight className="mt-2 mx-2" />
                    </li>
                  </ul>
                  <ul>
                    {myInterviewBooking &&
                      myInterviewBooking.map((data) => (
                        <>
                          <li className="mb-1 text-xl font-medium text-gray-900 dark:text-white text-start">
                            {data?.name}
                          </li>
                          <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                            {data?.email}
                          </li>
                          <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                            {data?.title}
                          </li>
                          <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                            {data?.bookingtime}
                          </li>
                          <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                            {data?.timeZoonValue}
                          </li>
                          <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                            {data?.interviewType}
                          </li>
                          <li className="text-lg text-gray-500 dark:text-gray-400 flex">
                            {data?.duration}
                          </li>
                        </>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <a
                  href={meetLink}
                  target="_blank"
                  className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join Now
                </a>

                <button
                  onClick={() => cancelInterview()}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className=" h-[400px] mt-5 flex justify-center items-center">
          <h1 className="text-3xl">No Data Found</h1>
        </div>
      )}
    </div>
  );
};

export default BookingInterview;
