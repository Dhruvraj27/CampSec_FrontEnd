import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
export const CardEntries = ({
  data,
  setSelectedId,
  setOpen,
  Updateformik,
  setOpenEditEntries,
  setSelectedEntryId,
  timer,
}) => {
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  return (
    <Card className="mt-6 w-96 bg-[#82a0bc]">
      <CardBody>
        <div className="bothIcons flex justify-between">
          <div className="flex flex-col">
            <FaUser size="3rem" />
            <div className="image_wrapper w-[50px] h-[50px]">
              <img
                src={data?.signURL}
                onClick={() => {
                  setCloseModalOpen(true);
                }}
                className="w-full h-full cursor-pointer"
                alt=""
              />
            </div>
            <Modal
              open={closeModalOpen}
              onClose={() => {
                setCloseModalOpen(false);
              }}
              center
            >
              <img src={data?.signURL} alt="" />
            </Modal>
          </div>
          <MdEditSquare
            color="#000000d1"
            className="cursor-pointer"
            size="1.5rem"
            onClick={() => {
              Updateformik.setFieldValue("name", data.name);
              Updateformik.setFieldValue(
                "purposeOfComing",
                data.purposeOfComing
              );
              Updateformik.setFieldValue("contactNumber", data.contactNumber);
              Updateformik.setFieldValue("vehicleNumber", data.vehicleNumber);
              setSelectedEntryId(data._id);
              setOpenEditEntries(true);
            }}
          />
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {data?.name}
        </Typography>
        <Typography className="flex">
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Purpose:
          </Typography>
          <Typography variant="h6" className="ml-1 break-all">
            {data?.purposeOfComing}
          </Typography>
        </Typography>
        <Typography className="flex ">
          <Typography color="blue-gray" variant="h6" className="font-bold">
            Contact:
          </Typography>
          <Typography variant="h6" className="ml-1">
            {data?.contactNumber}
          </Typography>
        </Typography>
        <Typography className="flex ">
          <Typography color="blue-gray" variant="h6" className="font-bold">
            Vehicle No:
          </Typography>
          <Typography variant="h6" className="ml-1">
            {data?.vehicleNumber}
          </Typography>
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="btns-here">
          <div variant="gradient" className="flex items-center mb-2">
            <Chip
              variant="ghost"
              color="green"
              size="sm"
              value="Entry"
              icon={
                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
              }
            />
            :
            <div
              className="flex  px-1 items-center rounded w-full justify-end"
              style={{ fontSize: "16px" }}
            >
              <p className="flex justify-end bg-[#e4ebff] px-2 rounded-md float-right">
                {data?.entryTime}
              </p>
            </div>
          </div>
          {data?.exitTime == "" ? (
            <Button
              color="red"
              size="sm"
              className="flex items-center text-xs"
              onClick={() => {
                setSelectedId(data?._id);
                setOpen(true);
              }}
            >
              <p className="mr-1">{timer} </p> |{" "}
              <p className="text-xs ml-1"> Exit Time</p>
            </Button>
          ) : (
            <div className="flex items-center ">
              <Chip
                variant="ghost"
                color="red"
                size="sm"
                value="Exit"
                icon={
                  <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
                }
              />
              :
              <div
                className="flex   p-1 items-center rounded font-normal w-full justify-end"
                style={{ fontSize: "16px" }}
              >
                <p className="flex justify-end bg-[#e4ebff] px-2 rounded-md float-right">
                  {data?.exitTime}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
