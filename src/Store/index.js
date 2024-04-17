import { configureStore } from "@reduxjs/toolkit";
import GateKeeperSlice from "./GateKeeperSlice/GateKeeperSlice";
export const store = configureStore({
  reducer: {
    GateKeeperSlice,
  },
});
