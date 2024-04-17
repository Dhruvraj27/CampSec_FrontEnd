import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";

export const ConfirmationModal = ({
  open,
  setOpen,
  handleAddExitTime,
  isExitTimeLoader,
}) => {
  return (
    <>
      <Dialog open={open} size="sm">
        <DialogHeader>Are you sure you want to exit</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            className="mr-1"
            onClick={() => setOpen(false)}
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddExitTime}>
            {isExitTimeLoader ? <Spinner /> : <span>Confirm</span>}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
