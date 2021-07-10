import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "./Authentication";

export const store = configureStore({
  reducer: {
      //all the reducers come here
      auth:AuthReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})