import { Button, Input, Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { AddEntries } from "./AddEntriesModal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UseGetApiHook, UsePostApiHook, UsePutApiHook } from "../ApiHook/api";
import { Navbars } from "./Navbar";
import { CardEntries } from "./CardComponent";
import {
  AddEntriesData,
  pushEntryDataToEntries,
  updateEntries,
  updateEntriesControlledData,
} from "../Store/GateKeeperSlice/GateKeeperSlice";
import { getEntryTime } from "../Utils/GetTimeAndHour";
import { ConfirmationModal } from "./DialogConfirmation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditEntries } from "./EditEntriesModal";
export const GatekeeperView = () => {
  const [openEntries, setOpenEntries] = useState(false);
  const [openEditEntries, setOpenEditEntries] = useState(false);
  const [EditEntriesLoading, setEditEntriesLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isAddEntriesLoading, setIsAddEntriesLoading] = useState(false);
  const [isEntriesLoading, setIsEntriesLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedEntryId, setSelectedEntryId] = useState("");
  const [isExitTimeLoader, setIsExitTimeLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [timer, setTimer] = useState();
  const [imageURL, setImageURL] = useState(null);

  const { AllGateKeeperEntries } = useSelector(
    (state) => state.GateKeeperSlice
  );

  const dispatch = useDispatch();

  const fetchAllEntries = async () => {
    try {
      setIsEntriesLoading(true);
      let url = `/getAllgateKeeperData`;
      let response = await UseGetApiHook(url);
      if (response.status == 200) {
        setIsEntriesLoading(false);
        dispatch(AddEntriesData(response?.data?.data));
      } else {
        setIsEntriesLoading(false);
      }
    } catch (error) {
      setIsEntriesLoading(false);
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      entryTime: "",
      exitTime: "",
      purposeOfComing: "",
      contactNumber: null,
      vehicleNumber: "",
      signURL: imageURL,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      purposeOfComing: Yup.string().required("required"),
      contactNumber: Yup.string()
        .required("Contact Number is required")
        .test("len", "Contact number must be exactly 10 digits", (val) => val && val.length === 10),
      vehicleNumber: Yup.string(),
      signURL: Yup.string().required("Signature is required"),
    }),
    onSubmit: (values) => {
      handleAddEntries();
    },
  });
  const Updateformik = useFormik({
    initialValues: {
      name: "",
      purposeOfComing: "",
      contactNumber: null,
      vehicleNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      purposeOfComing: Yup.string().required("required"),
      contactNumber: Yup.number().required("required"),
      vehicleNumber: Yup.string(),
    }),
    onSubmit: (values) => {
      handleUpdateEntries();
    },
  });
  const handleAddEntries = async () => {
    try {
      setIsAddEntriesLoading(true);
      const url = `/register-gate-keeper`;
      const response = await UsePostApiHook(url, formik.values);
      if (response.status == 200) {
        setIsAddEntriesLoading(false);
        dispatch(pushEntryDataToEntries(response?.data?.data));
        toast.success(response?.data?.message);
        setOpenEntries(false);
        setImageURL("");
      } else {
        setIsAddEntriesLoading(false);
      }
    } catch (error) {
      setIsAddEntriesLoading(false);
      console.log(error);
    }
  };

  const handleAddExitTime = async () => {
    try {
      setIsExitTimeLoader(true);
      let url = `/updateGateKeeperData/${selectedId}`;
      let payload = {
        exitTime: getEntryTime() || "",
      };
      const response = await UsePutApiHook(url, payload);
      if (response.status === 200) {
        dispatch(updateEntries(response?.data?.data));
        toast.success(response?.data?.message);
        setIsExitTimeLoader(false);
        setOpenDialog(false);
        setSelectedId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateEntries = async () => {
    try {
      setEditEntriesLoading(true);
      let url = `/updateGateKeeperControllData/${selectedEntryId}`;
      let response = await UsePutApiHook(url, Updateformik?.values);
      if (response.status == 200) {
        dispatch(updateEntriesControlledData(response?.data?.data));
        toast.success(response?.data?.message);
        setEditEntriesLoading(false);
        setOpenEditEntries(false);
      }
    } catch (error) {
      setEditEntriesLoading(false);
      setOpenEditEntries(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllEntries();
  }, []);
  useEffect(() => {
    function getCurrentTime() {
      var currentDate = new Date();
      var hours =
        currentDate.getHours() > 12
          ? currentDate.getHours() - 12
          : currentDate.getHours();
      hours === 0 ? (hours = 12) : (hours = hours);
      var minutes = currentDate.getMinutes();
      var seconds =
        currentDate.getSeconds() < 10
          ? "0" + currentDate.getSeconds()
          : currentDate.getSeconds();
      var currentTime = hours + ":" + minutes + ":" + seconds;
      return currentTime;
    }
    let interval = setInterval(() => {
      setTimer(getCurrentTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  let filteredData = AllGateKeeperEntries.filter((data) => {
    if (searchValue == "") {
      return data;
    } else if (data.name.toLowerCase().includes(searchValue.toLowerCase())) {
      return data;
    }
  });
  return (
    <div>
      <div className="navbar">
        <Navbars />
      </div>
      <div>
        <div className="button_wrapper w-full  flex justify-end p-5">
          <Button
            variant="gradient"
            className="flex items-center gap-3"
            onClick={() => {
              setOpenEntries(true);
            }}
          >
            Add Entries
            <IoAddCircle size={"1.5rem"} />
          </Button>
        </div>
        <div className="w-72 m-auto">
          <Input
            color="blue"
            onChange={(e) => setSearchValue(e.target.value.trim())}
            label="Search By Name"
          />
        </div>
      </div>
      <div className="w-full m-auto justify-center items-center">
        {isEntriesLoading ? (
          <div className=" flex justify-center items-center">
            <Spinner className="h-12 w-12 " />
          </div>
        ) : (
          <div className="w-full flex m-auto items-center flex-wrap ">
            <>
              {filteredData?.map((data) => {
                return (
                  <div className=" mx-3">
                    <CardEntries
                      Updateformik={Updateformik}
                      data={data}
                      setOpen={setOpenDialog}
                      setSelectedId={setSelectedId}
                      setOpenEditEntries={setOpenEditEntries}
                      setSelectedEntryId={setSelectedEntryId}
                      timer={timer}
                    />
                  </div>
                );
              })}
            </>
          </div>
        )}
      </div>
      <ConfirmationModal
        setOpen={setOpenDialog}
        open={openDialog}
        handleAddExitTime={handleAddExitTime}
        isExitTimeLoader={isExitTimeLoader}
      />
      <AddEntries
        open={openEntries}
        setOpen={setOpenEntries}
        handleAddEntries={handleAddEntries}
        isAddEntriesLoading={isAddEntriesLoading}
        formik={formik}
        setImageURL={setImageURL}
        imageURL={imageURL}
      />
      <EditEntries
        open={openEditEntries}
        setOpen={setOpenEditEntries}
        handleAddEntries={handleAddEntries}
        isAddEntriesLoading={EditEntriesLoading}
        formik={Updateformik}
      />
    </div>
  );
};
