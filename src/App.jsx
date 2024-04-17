import React from "react";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Private from "./PrivateRoute/Private";
import Home from "./Components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageNotFound } from "./Components/PageNotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/signUp" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Private Children={Home} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
