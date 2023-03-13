import { Button, Checkbox, Label } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
// react icon
import { FiVideoOff } from "react-icons/fi";
import { BsTelephoneForward } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { BsChevronDown } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import Loading from "../../Share/Loading/Loading";

const Dashboard = () => {
  const { url, loading } = useContext(AuthContext);
  const [showCheckBoxSection, setShowCheckBoxSection] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [allDayTimeSlode, setAllDayTimeSlode] = useState([]);
  const [AllselectedDates, setAllSelectedDates] = useState([]);
  const [timeSlode, setTimeSlode] = useState([]);
  const [timeZoonValue, setTimeZoonValue] = useState("Bangladesh");
  const [interviewType, setInterviewType] = useState("Video Call");
  const [duration, setDuration] = useState("30 Minute");
  const [allInterviewScheduleDate, setAllInterviewScheduleDate] = useState([]);
  const [monthError, setMonthErrore] = useState("");
  const navigate = useNavigate();

  // All intterview Time Slode data get
  useEffect(() => {
    fetch(`${url}all-interview-time-slode`)
      .then((res) => res.json())
      .then((data) => setTimeSlode(data));

    fetch(`${url}all-interview-schedule-data`)
      .then((res) => res.json())
      .then((data) => setAllInterviewScheduleDate(data));

    // fetch(`${url}all-day-time-slode`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setAllDayTimeSlode(data);
    //   });
  }, [url]);

  // all selcted date
  useEffect(() => {
    const allDate = [];

    for (const day of selectedDates) {
      const singleDate = format(day, "PP");
      allDate.push(singleDate);
    }
    setAllSelectedDates(allDate);
  }, [selectedDates]);

  // time slode value chahge function
  const timeSlodeId = (id) => {
    fetch(`${url}interview-time-slode-value-change`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    // fetch(`${url}all-day-time-slode`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     setAllDayTimeSlode(data);
    //   });
  };

  console.log(AllselectedDates);

  // All Time zoon
  const timeZoon = [
    { _id: 1, timeZoonName: "Bangladesh" },
    { _id: 2, timeZoonName: "India" },
    { _id: 3, timeZoonName: "Canada" },
    { _id: 4, timeZoonName: "United States" },
  ];

  // interviewScheduleData from data
  const interviewScheduleData = (e) => {
    e.preventDefault();
    const form = e.target;
    const AddTitle = form.AddTitle.value;
    const MeetLink = form.MeetLink.value;
    const currentMont = document.getElementById("react-day-picker-2").innerText;

    fetch(`${url}all-day-time-slode`)
      .then((res) => res.json())
      .then((data) => {
        if (
          selectedDates.length &&
          MeetLink?.length &&
          AddTitle?.length &&
          currentMont?.length &&
          data?.length
        ) {
          const interviewTimeSchedule = {
            currentMont,
            timeZoonValue,
            AllselectedDates,
            interviewType,
            duration,
            AddTitle,
            MeetLink,
            allDayTimeSlode: data,
          };
          console.log(interviewTimeSchedule);
          fetch(`${url}interview-schedule-data`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("access_Token")}`,
            },
            body: JSON.stringify(interviewTimeSchedule),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data?.errorMessage) {
                setMonthErrore(data?.errorMessage);
              }
              if (data?.acknowledged) {
                console.log("Hello");
                navigate("/Interview-Mont");
              }
            });
        } else {
          setMonthErrore("please set Add title adn Meet Link");
        }
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
      <h1 className="text-2xl py-5">This is Dashboard</h1>
      <form onSubmit={(e) => interviewScheduleData(e)}>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <div className="">
            <h1 className="text-2xl mb-4">Interview Date</h1>
            <DayPicker
              className="flex justify-center  "
              mode="multiple"
              min={1}
              selected={selectedDates}
              onSelect={setSelectedDates}
            />
          </div>
          <div className=" pr-0 md:pr-10 pt-10">
            {monthError && (
              <p className="text-emerald-400 flex justify-center items-center">
                <MdErrorOutline className="mt-2 mr-2" /> {monthError}
              </p>
            )}
            <div className="mb-6 text-start">
              <label
                htmlFor="default-input"
                className="block mb-3 ml-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Add Title
              </label>
              <input
                type="text"
                name="AddTitle"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6 text-start">
              <label
                htmlFor="default-input"
                className="block mb-3 ml-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meet Link
              </label>
              <input
                type="text"
                name="MeetLink"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="large"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-white text-start ml-2"
              >
                Time Zoon
              </label>
              <div className="flex justify-center items-center">
                <select
                  id="large"
                  className="block w-full px-4 py-3  text-base text-gray-900 border md:border-r-0 border-gray-300     rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onClick={(e) => setTimeZoonValue(e.target.value)}
                >
                  {timeZoon?.map((time) => (
                    <option key={time?._id} defaultValue={time?.timeZoonName}>
                      {time?.timeZoonName}
                    </option>
                  ))}
                </select>

                <span
                  id="large"
                  className="block w-full px-4 py-3 text-base text-gray-900 border border-r-0 border-gray-300 rounded-r-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 pr-2 cursor-pointer flex justify-between items-center"
                  onClick={() => setShowCheckBoxSection(!showCheckBoxSection)}
                >
                  Selected Time
                  <BsChevronDown className="mt-2 text-sm text-gray-400" />
                </span>
              </div>
              <div
                className={`bottom-[140px] right-[330px] mt-2 rounded-lg ${
                  showCheckBoxSection ? "" : "hidden"
                }`}
              >
                <div
                  className="flex flex-col gap-4 bg-gray-600 p-5"
                  id="checkbox"
                >
                  {timeSlode?.map((time) => (
                    <div className="flex items-center gap-2" key={time?._id}>
                      <Checkbox
                        id="accept"
                        defaultChecked={time?.value}
                        onClick={() => timeSlodeId(time?._id)}
                      />
                      <Label htmlFor="accept">{time?.timeSlode}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="xl:flex  justify-between items-start">
              <div>
                <h1 className="block mb-2 mt-6 text-base font-medium text-gray-900 dark:text-white text-start ml-2">
                  Interview Type
                </h1>
                <div className="flex rounded-md shadow-sm ml-1" role="group">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 flex justify-center items-center"
                    onClick={() => setInterviewType("Video Call")}
                  >
                    <FiVideoOff className="mr-2 text-2xl" /> Video Call
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 flex justify-center items-center"
                    onClick={() => setInterviewType("phone")}
                  >
                    <BsTelephoneForward className="mr-2 text-2xl" /> phone
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 flex justify-center items-center"
                    onClick={() => setInterviewType("In Office")}
                  >
                    <FcBusinessman className="mr-2 text-2xl" />
                    In Office
                  </button>
                </div>
              </div>
              <div>
                <h1 className="block mb-2 mt-6 text-base font-medium text-gray-900 dark:text-white text-start ml-2">
                  Duration
                </h1>
                <div className="flex rounded-md shadow-sm ml-1" role="group">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 flex justify-center items-center"
                    onClick={() => setDuration("30 Minute")}
                  >
                    30 Minute
                  </button>

                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 flex justify-center items-center"
                    onClick={() => setDuration(" 60 Minute")}
                  >
                    60 Minute
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
