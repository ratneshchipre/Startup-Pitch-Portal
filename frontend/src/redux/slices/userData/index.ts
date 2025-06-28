import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserDataTypes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const fetchUserData = createAsyncThunk(
  "fetchUserData",
  async ({
    role,
    userId,
  }: {
    role: string | undefined;
    userId: string | undefined;
  }) => {
    const response = await axios.get(`/api/account/${role}/${userId}/data`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  }
);

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    isLoading: false,
    data: null as UserDataTypes | null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.userData;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log("Error:", action.payload);
      state.isError = true;
    });
  },
});

export default userDataSlice.reducer;
