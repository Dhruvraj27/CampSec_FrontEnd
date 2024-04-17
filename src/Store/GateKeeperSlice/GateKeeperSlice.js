import { createSlice } from "@reduxjs/toolkit";

const gateKeeperSlice = createSlice({
  name: "gateKeeperSlice",
  initialState: {
    AllGateKeeperEntries: [],
    isLoading: false,
  },
  reducers: {
    AddEntriesData: (state, action) => {
      return {
        ...state,
        AllGateKeeperEntries: action.payload,
      };
    },
    pushEntryDataToEntries: (state, action) => {
      return {
        ...state,
        AllGateKeeperEntries: [action.payload, ...state.AllGateKeeperEntries],
      };
    },
    updateEntries: (state, action) => {
      let updatedData = state.AllGateKeeperEntries.map((data) => {
        return data._id === action.payload._id ? action.payload : data;
      });
      return {
        ...state,
        AllGateKeeperEntries: updatedData,
      };
    },
    updateEntriesControlledData: (state, action) => {
      let updatedData = state.AllGateKeeperEntries.map((data) => {
        return data._id === action.payload._id ? action.payload : data;
      });
      return {
        ...state,
        AllGateKeeperEntries: updatedData,
      };
    },
  },
});
export const {
  AddEntriesData,
  pushEntryDataToEntries,
  updateEntries,
  updateEntriesControlledData,
} = gateKeeperSlice.actions;
export default gateKeeperSlice.reducer;
