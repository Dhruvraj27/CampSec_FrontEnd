import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import { getEntryTime } from "../Utils/GetTimeAndHour";
import SignaturePad from "react-signature-canvas";

export const AddEntries = ({
  open,
  setOpen,
  formik,
  isAddEntriesLoading,
  imageURL,
  setImageURL,
}) => {
  const [openSignDialog, setOpenSignDialog] = useState(false);
  const sigCanvas = useRef({});
  const clear = () => {
    sigCanvas.current.clear();
  };
  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas()?.toDataURL("image/png"));
    formik.setFieldValue(
      "signURL",
      sigCanvas.current.getTrimmedCanvas()?.toDataURL("image/png")
    );
    setOpenSignDialog(false);
    clear();
  };
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        className="bg-transparent shadow-none overflow-y-auto"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody
            className="flex flex-col gap-4 border-4  border-b-transparent 
           border-l-indigo-500 border-r-indigo-500"
          >
            <Typography variant="h4" color="blue-gray">
              Add Entry
            </Typography>
            <Typography className="-mb-4" variant="h6">
              Name
            </Typography>
            <Input
              label="Name"
              name="name"
              onChange={formik?.handleChange}
              size="lg"
            />
            {formik?.touched?.name && formik?.errors?.name ? (
              <div className="text-[red]">{formik?.errors?.name}</div>
            ) : null}
            <Typography className="-mb-4" variant="h6">
              Purpose of coming?
            </Typography>

            <Textarea
              label="Purpose"
              name="purposeOfComing"
              onChange={formik?.handleChange}
              size="lg"
            />
            {formik?.touched?.purposeOfComing &&
              formik?.errors?.purposeOfComing ? (
              <div className="text-[red]">
                {formik?.errors?.purposeOfComing}
              </div>
            ) : null}
            <Typography className="-mb-4" variant="h6">
              Contact Number
            </Typography>
            <Input
              label="02325468784"
              onChange={formik.handleChange}
              name="contactNumber"
              type="number"
              size="lg"
            />
            {formik?.touched?.contactNumber && formik?.errors?.contactNumber ? (
              <div className="text-[red]">{formik?.errors?.contactNumber}</div>
            ) : null}
            <Typography className="-mb-4" variant="h6">
              Vehicle Number
            </Typography>
            <Input
              label="HR26XX0000"
              onChange={formik.handleChange}
              name="vehicleNumber"
              value={formik.values.vehicleNumber.toUpperCase()}
              size="lg"
            />
            {formik?.touched?.vehicleNumber && formik?.errors?.vehicleNumber ? (
              <div className="text-[red]">{formik?.errors?.vehicleNumber}</div>
            ) : null}
            <Button
              onClick={() => {
                setOpenSignDialog(true);
              }}
            >
              Add Signature
            </Button>
            {formik?.touched?.signURL && formik?.errors?.signURL ? (
              <div className="text-[red]">{formik?.errors?.signURL}</div>
            ) : null}
            {imageURL && (
              <img src={imageURL} height="50px" width="50px" alt="" />
            )}

            {/* <div className="signPad"> */}
            <Dialog
              size="xs"
              open={openSignDialog}
              className="bg-white shadow-none "
            >
              <SignaturePad
                ref={sigCanvas}
                canvasProps={{
                  className: "signatureCanvas",
                }}
              />
              <CardFooter className="pt-0">
                <div className="flex justify-center">
                  <Button
                    variant="outlined"
                    className="flex items-center justify-center w-full text-center gap-3 mr-2"
                    onClick={() => {
                      setOpenSignDialog(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="#001242"
                    className="flex justify-center items-center w-full text-center gap-3 bg-[#001242]"
                    onClick={() => {
                      save();
                    }}
                  >
                    {isAddEntriesLoading ? <Spinner /> : `Add Signature`}
                  </Button>
                </div>
              </CardFooter>
            </Dialog>
            {/* </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex justify-center">
              <Button
                variant="outlined"
                className="flex items-center justify-center w-full text-center gap-3 mr-2"
                onClick={() => {
                  setOpen(false);
                  formik.resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                color="#001242"
                size="sm"
                className="flex justify-center items-center w-full text-center gap-3 bg-[#001242]"
                onClick={() => {
                  formik.setFieldValue("entryTime", getEntryTime());
                  formik.handleSubmit();
                }}
              >
                {isAddEntriesLoading ? <Spinner /> : `Add`}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};
