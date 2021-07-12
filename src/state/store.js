import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "./Authentication";
import OnboardingReducer from "./OnboardingSlice"
import PropertyReducer from "./PropertySlice"

export const store = configureStore({
  reducer: {
      //all the reducers come here
      auth:AuthReducer,
      onboarding:OnboardingReducer,
      property:PropertyReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})