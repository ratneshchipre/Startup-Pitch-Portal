import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface investorPitches {
  _id: string;
  userId: string;
  title: string;
  details: string;
  file: object;
  category: string;
  goal: number;
  tags: string;
}

export const fetchPitchesForInvestor = createAsyncThunk(
  "fetchPitchesForInvestor",
  async () => {
    const response = await axios.get("/api/pitches/browse-pitches", {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  }
);

export const investorPitchesSlice = createSlice({
  name: "investorPitches",
  initialState: {
    isLoading: false,
    data: null as investorPitches | null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPitchesForInvestor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPitchesForInvestor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.pitches;
    });
    builder.addCase(fetchPitchesForInvestor.rejected, (state, action) => {
      console.log("Error:", action.payload);
      state.isError = true;
    });
  },
});

export default investorPitchesSlice.reducer;
