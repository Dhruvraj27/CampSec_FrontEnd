import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UsePostApi } from "./ApiHook/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@material-tailwind/react";
export default function Login() {
  const [loginLoader, setLoginLoader] = useState(false);
  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6).required("required"),
    }),
    onSubmit: (values) => {
      handleLoginForm();
    },
  });

  const handleLoginForm = async () => {
    try {
      setLoginLoader(true);
      let url = `/signIn`;
      let response = await UsePostApi(url, formik.values);
      let token = response.data.accessToken;
      if (response.status == 200) {
        setLoginLoader(false);
        localStorage.setItem("accessToken", token);
        toast.success(response?.data?.message);
        navigate("/");
      }
      // else {
      //   console.log(response, "show the response here in the ELSE BLOCK");
      //   setLoginLoader(false);
      // }
    } catch (error) {
      setLoginLoader(false);
      toast.error(error?.response?.data?.message);
      console.log(error, "show the error 78888888");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [localStorage.getItem("accessToken")]);

  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome.</p>
            <div className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <label for="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  placeholder="your@email.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-[red]">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="flex flex-col pt-4">
                <label for="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-[red]">{formik.errors.password}</div>
                ) : null}
              </div>

              <button
                type="submit"
                value="Log In"
                onClick={formik.handleSubmit}
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              >
                {loginLoader ? (
                  <span className="flex justify-center items-center">
                    <Spinner />
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <div className="text-center pt-12 pb-12">
              <p>
                Don't have an account?{" "}
                <Link to="/signUp" className="underline font-semibold">
                  Register here.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
            alt="check"
          />
        </div>
      </div>
    </div>
  );
}
