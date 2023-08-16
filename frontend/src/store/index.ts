import { configureStore } from "@reduxjs/toolkit"
import sheetReducer from "./slicers/sheetsSlice"

const store = configureStore({
  reducer: {
    sheets: sheetReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
