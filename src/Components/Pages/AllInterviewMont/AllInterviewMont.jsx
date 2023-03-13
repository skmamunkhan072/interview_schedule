import { Button, Card, Dropdown } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvaider/AuthContextProvaider";
import Loading from "../../Share/Loading/Loading";

const AllInterviewMont = () => {
  const { url, loading } = useContext(AuthContext);
  const [allInterviewScheduleDate, setAllInterviewScheduleDate] = useState([]);
  const { AllselectedDates, currentMont } = allInterviewScheduleDate;

  // All intterview Time Slode data get
  useEffect(() => {
    fetch(`${url}all-interview-schedule-data`)
      .then((res) => res.json())
      .then((datas) => {
        if (datas) {
          setAllInterviewScheduleDate(datas);
        }
      });
  }, [url]);

  const interviewMontDataDelete = (id) => {
    console.log(id);
    fetch(`${url}interview-Mont-data-delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("access_Token")}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          fetch(`${url}all-interview-schedule-data`)
            .then((res) => res.json())
            .then((datas) => {
              if (datas) {
                setAllInterviewScheduleDate(datas);
              }
            });
        }
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
    <div className="pt-10">
      <h1 className="text-2xl">All interview Mont Schedule</h1>
      {allInterviewScheduleDate.length ? (
        <>
          <div className="grid gap-5 grid-cols-1 md: grid-co lg:grid-cols-3 py-10">
            {allInterviewScheduleDate?.map((allCardData) => (
              <div className="max-w-sm" key={allCardData?._id}>
                <Card>
                  <div className="flex justify-end px-4 pt-4">
                    <Dropdown inline={true} label="">
                      <Dropdown.Item>
                        <span className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                          Edit
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <span
                          className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() =>
                            interviewMontDataDelete(allCardData?._id)
                          }
                        >
                          Delete
                        </span>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                  <div className="flex flex-col items-center pb-10">
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {allCardData?.currentMont}
                    </h5>
                    <div className="flex justify-center">
                      <ul className="w-full mt-5 flex justify-center items-center flex-wrap">
                        {allCardData?.AllselectedDates?.map((date, i) => (
                          <li
                            key={i}
                            className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-500 m-1"
                          >
                            {date?.length === 11
                              ? date.slice(3, 5)
                              : date.slice(3, 6)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                      <div>
                        <Button gradientDuoTone="greenToBlue">Delete</Button>
                      </div>
                      <div>
                        <Button gradientDuoTone="purpleToPink">Complete</Button>
                      </div>
                    </div>
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

export default AllInterviewMont;
