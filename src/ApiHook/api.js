import axios from "axios";
export const UsePostApi = async (url, payload) => {
  try {
    let URL = `http://localhost:4500/api/v1${url}`;
    const response = await axios.post(URL, payload);
    return response;
  } catch (error) {
    throw error;
    // console.log(error);
    // return error;
  }
};
export const UsePostApiHook = async (url, payload) => {
  try {
    let URL = `http://localhost:4500/api/v1${url}`;
    const response = await axios.post(URL, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const UseGetApiHook = async (url) => {
  try {
    let URL = `http://localhost:4500/api/v1${url}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const UsePutApiHook = async (url, payload) => {
  try {
    let URL = `http://localhost:4500/api/v1${url}`;
    const response = await axios.put(URL, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};