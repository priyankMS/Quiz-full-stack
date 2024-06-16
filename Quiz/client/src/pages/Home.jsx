import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { SelectedContext } from "../SelectedContext";
import { useContext } from "react";

function Home() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(SelectedContext);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const watchFeild = useWatch({ control });

  useEffect(() => {
    setFormData({
      username: watchFeild.username,
      email: watchFeild.email,
    });
  }, [watchFeild]);

  const onSubmit = (data) => {
    console.log(data);
    navigate("/quiz");
    reset();
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-gray-100">
      <button
        className="bg-green-500 text-xl w-[10rem] hover:bg-green-600 text-white py-2 top-0 px-2 transition-colors"
        onClick={() => navigate("/admin")}
      >
        Admin
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        * React Quiz App *
      </h1>

      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-60"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              User Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters",
                },
              })}
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Entered value does not match email format",
                },
              })}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Take Your Test
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
}

export default Home;
