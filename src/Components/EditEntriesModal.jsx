import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";

export const EditEntries = ({ open, setOpen, formik, isAddEntriesLoading }) => {
  return (
    <>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none ">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody
            className="flex flex-col gap-4 border-4  border-b-transparent 
           border-l-indigo-500 border-r-indigo-500"
          >
            <Typography variant="h4" color="blue-gray">
              Edit Entry
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Name
            </Typography>
            <Input
              label="Name"
              name="name"
              onChange={formik?.handleChange}
              value={formik.values.name}
              size="lg"
            />
            {formik?.touched?.name && formik?.errors?.name ? (
              <div className="text-[red]">{formik?.errors?.name}</div>
            ) : null}
            <Typography className="-mb-2" variant="h6">
              Purpose of coming?
            </Typography>
            {/* <Input
              label="Purpose"
              name="purposeOfComing"
              onChange={formik?.handleChange}
              size="lg"
              value={formik.values.purposeOfComing}
            /> */}
            <Textarea
              label="Purpose"
              name="purposeOfComing"
              onChange={formik?.handleChange}
              size="lg"
              value={formik.values.purposeOfComing}
            />
            {formik?.touched?.purposeOfComing &&
            formik?.errors?.purposeOfComing ? (
              <div className="text-[red]">
                {formik?.errors?.purposeOfComing}
              </div>
            ) : null}
            <Typography className="-mb-2" variant="h6">
              Contact Number
            </Typography>
            <Input
              label="02325468784"
              onChange={formik.handleChange}
              name="contactNumber"
              size="lg"
              value={formik.values.contactNumber}
            />
            {formik?.touched?.contactNumber && formik?.errors?.contactNumber ? (
              <div className="text-[red]">{formik?.errors?.contactNumber}</div>
            ) : null}
            <Typography className="-mb-2" variant="h6">
              Vehicle Number
            </Typography>
            <Input
              label="HR26XX0000"
              onChange={formik.handleChange}
              name="vehicleNumber"
              value={formik.values.vehicleNumber}
              size="lg"
            />
            {formik?.touched?.vehicleNumber && formik?.errors?.vehicleNumber ? (
              <div className="text-[red]">{formik?.errors?.vehicleNumber}</div>
            ) : null}
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
                className="flex justify-center items-center w-full text-center gap-3 bg-[#001242]"
                onClick={() => {
                  formik.handleSubmit();
                }}
                loading={isAddEntriesLoading}
              >
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};
