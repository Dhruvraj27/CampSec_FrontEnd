import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UsePostApi } from "./ApiHook/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@material-tailwind/react";
export default function Register() {
  const [registerLoader, setRegisterLoader] = useState(false);
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
    onSubmit: () => {
      handleRegisterForm();
    },
  });

  const handleRegisterForm = async () => {
    try {
      setRegisterLoader(true);
      let url = `/register`;
      let response = await UsePostApi(url, formik.values);
      if (response.status == 200) {
        setRegisterLoader(false);
        toast.success(response.data?.data?.message);
        return navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setRegisterLoader(false);
      console.log(error);
    }
  };
  return (
    <div className="bg-white h-screen my-custom-font-family">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Join Us.</p>
            <div className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
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
                <label htmlFor="password" className="text-lg">
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
                value="Register"
                onClick={formik.handleSubmit}
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              >
                {registerLoader ? (
                  <div className="flex justify-center items-center">
                    <Spinner className="flex justify-center items-center w-full m-auto" />
                  </div>
                ) : (
                  `Register`
                )}
              </button>
            </div>
            <div className="text-center pt-12 pb-12">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="underline font-semibold">
                  Log in here.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
            alt="test"
          />
        </div>
      </div>
    </div>
  );
}
