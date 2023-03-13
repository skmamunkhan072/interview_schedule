import { Card, Checkbox, Dropdown, Label } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// React icon
import { BsArrowUpRight } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import Loading from "../../Share/Loading/Loading";

const InterviewSchedule = () => {
  const { url, user, loading } = useContext(AuthContext);
  const [allInterviewScheduleDate, setAllInterviewScheduleDate] = useState([]);
  const [timeSlode, setTimeSlode] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [interviewTimeError, setInterviewTimeError] = useState(false);
  const [myInterviewBookingTime, setMyInterviewBookingTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${url}all-interview-schedule-data`)
      .then((res) => res.json())
      .then((datas) => {
        if (datas) {
          setAllInterviewScheduleDate(datas);
          // console.log(datas);
        }
      });
  }, [url]);

  // selectinterviewDate
  const selectinterviewDate = (
    date,
    title,
    duration,
    interviewType,
    timeZoonValue,
    MeetLink
  ) => {
    if (user && myInterviewBookingTime) {
      const bokingInterviewTime = {
        email: user?.email,
        name: user?.displayName,
        bookingtime: myInterviewBookingTime,
        bookingDate: date,
        title,
        duration,
        interviewType,
        timeZoonValue,
        MeetLink,
      };
      console.log(bokingInterviewTime);

      fetch(`${url}booking-interview-date`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("access_Token")}`,
        },
        body: JSON.stringify(bokingInterviewTime),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.messge) {
            setErrorMessage(data?.messge);
          }
          console.log(data);
          if (data?.acknowledged) {
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

            navigate("/booking-interview");
          }
        });
    } else {
      setInterviewTimeError(true);
    }
  };

  const interviewBookingTime = (time) => {
    if (time) {
      setMyInterviewBookingTime("");
    }
    setMyInterviewBookingTime(time);
  };
  // console.log(myInterviewBookingTime);
  console.log(allInterviewScheduleDate);
  // loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[37.8rem]">
        <Loading />
      </div>
    );
  }
  return (
    <div className="py-5">
      <h1 className="text-2xl">Select One date </h1>
      {allInterviewScheduleDate.length ? (
        <>
          <div className="grid gap-5 grid-cols-1 md: grid-co lg:grid-cols-3 py-10">
            {allInterviewScheduleDate?.map((allCardData) => (
              <div className="max-w-sm" key={allCardData?._id}>
                <Card>
                  <div className="flex justify-end px-4 pt-4">
                    {interviewTimeError && (
                      <p className="text-emerald-400 flex justify-center items-center">
                        Please select tha time
                        <BsArrowUpRight />
                      </p>
                    )}
                    <Dropdown inline={true} label="">
                      <Dropdown.Item>
                        <div
                          className="flex flex-col gap-4 dark:bg-gray-600 p-5"
                          id="checkbox"
                        >
                          {allCardData?.allDayTimeSlode?.map(
                            (time, i) =>
                              time?.value === true && (
                                <div
                                  key={i}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox
                                    id="accept"
                                    defaultChecked={checkBoxValue}
                                    onClick={() => {
                                      interviewBookingTime(time?.timeSlode);
                                      setInterviewTimeError(false);
                                    }}
                                  />
                                  <Label htmlFor="accept">
                                    {time?.timeSlode}
                                  </Label>
                                </div>
                              )
                          )}
                        </div>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                  <div className="flex flex-col items-center pb-10">
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {allCardData?.currentMont}
                    </h5>
                    <h5 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      {allCardData?.AddTitle}
                    </h5>
                    <h5 className="mb-1 text-sm font-medium text-gray-900 dark:text-white flex justify-start items-center">
                      <span>{allCardData?.duration}</span>
                      <span className="ml-3">{allCardData?.interviewType}</span>
                    </h5>

                    <div className="flex justify-center">
                      <ul className="w-full mt-5 flex justify-center items-center flex-wrap">
                        {allCardData?.AllselectedDates?.map((date, i) => (
                          <li
                            key={i}
                            className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-500 m-1 cursor-pointer"
                            onClick={() =>
                              selectinterviewDate(
                                date,
                                allCardData?.AddTitle,
                                allCardData?.duration,
                                allCardData?.interviewType,
                                allCardData?.timeZoonValue,
                                allCardData?.MeetLink
                              )
                            }
                          >
                            {date?.length === 11
                              ? date.slice(3, 5)
                              : date.slice(3, 6)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {errorMessage && (
                      <p className="text-emerald-400 mt-5 flex justify-center items-center">
                        <MdErrorOutline className="mr-2" /> {errorMessage}
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className=" h-[400px] mt-5 flex justify-center items-center">
          <h1 className="text-3xl">No Data Found</h1>
        </div>
      )}
    </div>
  );
};

export default InterviewSchedule;
