import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface pitchDetails {
  _id: string;
  userId: string;
  title: string;
  details: string;
  file: object;
  category: string;
  goal: number;
  tags: string;
}

export const fetchPitchDetails = createAsyncThunk(
  "fetchPitchDetails",
  async ({ pitchId }: { pitchId: string | undefined }) => {
    const response = await axios.get(`/api/pitch/details/${pitchId}`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  }
);

export const pitchDetailsSlice = createSlice({
  name: "pitchDetails",
  initialState: {
    isLoading: false,
    data: null as pitchDetails | null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPitchDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPitchDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.pitch;
    });
    builder.addCase(fetchPitchDetails.rejected, (state, action) => {
      console.log("Error:", action.payload);
      state.isError = true;
    });
  },
});

export default pitchDetailsSlice.reducer;
