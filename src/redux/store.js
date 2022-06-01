import { combineReducers, configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

const reducer = combineReducers({
  weather: slice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;
