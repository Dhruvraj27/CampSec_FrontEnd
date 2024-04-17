import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Private = ({ Children }) => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, [token]);
  return (
    <div>
      <Children />
    </div>
  );
};

export default Private;
