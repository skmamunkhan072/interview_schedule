import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import BookingInterview from "../Pages/BookingInterview/BookingInterview";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Share/Login/Login";
import SingUp from "../Share/SingUp/SingUp";
import AllInterviewMont from "../Pages/AllInterviewMont/AllInterviewMont";
import Error from "../Share/Error/Error";
import InterviewSchedule from "../Pages/InterviewSchedule/InterviewSchedule";
import Home from "../Pages/Dashboard/Home/Home";
import AllUser from "../Pages/AllUser/AllUser";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AdminRoute from "./PrivateRoute/AdminRoute/AdminRoute";
import EmployerRoute from "./EmployerRoute/EmployerRoute";
import UserRoute from "./UserRoute/UserRoute";
import SelectAllInterviewUser from "../Pages/SelectAllInterviewUser/SelectAllInterviewUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <EmployerRoute>
              <Dashboard />
            </EmployerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/Interview-Mont",
        element: (
          <PrivateRoute>
            <EmployerRoute>
              <AllInterviewMont />
            </EmployerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/select-all-interview-user",
        element: (
          <PrivateRoute>
            <EmployerRoute>
              <SelectAllInterviewUser />
            </EmployerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/interview_schedule",
        element: (
          <PrivateRoute>
            <UserRoute>
              <InterviewSchedule />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/booking-interview",
        element: (
          <PrivateRoute>
            <UserRoute>
              <BookingInterview />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/sing-up", element: <SingUp /> },
      {
        path: "/all-user",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUser />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
