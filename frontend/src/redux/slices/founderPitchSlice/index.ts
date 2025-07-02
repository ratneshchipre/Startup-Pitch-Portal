import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface founderPitches {
  _id: string;
  userId: string;
  title: string;
  details: string;
  file: object;
  category: string;
  goal: number;
  tags: string;
}

export const fetchPitchesForFounder = createAsyncThunk(
  "fetchPitchesForFounder",
  async () => {
    const response = await axios.get("/api/pitch/my-pitches", {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  }
);

export const founderPitchesSlice = createSlice({
  name: "founderPitches",
  initialState: {
    isLoading: false,
    data: null as founderPitches[] | null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPitchesForFounder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPitchesForFounder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.pitches;
    });
    builder.addCase(fetchPitchesForFounder.rejected, (state, action) => {
      console.log("Error:", action.payload);
      state.isError = true;
    });
  },
});

export default founderPitchesSlice.reducer;
