import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import QuizAdmin from "./QuizAdmin";
import AdminData from "./AdminData";

export default function Admin() {


  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [adminLoginData, setAdminLoginData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setAdminLoginData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    setAdminLoginData({
      email: "",
      password: "",
    });

    if (
      adminLoginData.email === "pmshiroya56@gmail.com" &&
      adminLoginData.password === "admin1234"
    ) {
      toast.success("Login Successful");
      setIsLoggedIn(true);
    } else {
      toast.error("Invalid Email or Password");
    }
  }

  if (isLoggedIn) {
    return <AdminData />;
  } else {
    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Admin Section
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email Address
                </label>
              </div>

              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={adminLoginData.email}
                  onChange={changeHandler}
                  type="email"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={adminLoginData.password}
                  onChange={changeHandler}
                  type="password"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
