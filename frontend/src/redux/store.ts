import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./slices/userDataSlice";
import founderPitchesSlice from "./slices/founderPitchSlice";
import investorPitchesSlice from "./slices/investorPitchSlice";
import pitchDetailsSlice from "./slices/pitchDetailsSlice";

export const store = configureStore({
  reducer: {
    userData: userDataSlice,
    founderPitches: founderPitchesSlice,
    investorPitches: investorPitchesSlice,
    pitchDetails: pitchDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
