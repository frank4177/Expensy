import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/userSlice"


export const store = configureStore({
    reducer: {
        userSlice
    },
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: false
    })
  })