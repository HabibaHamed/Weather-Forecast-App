import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { history } from "../router";
import slice from "./slice";

const reducer = combineReducers({
  router: connectRouter(history),
  weather: slice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;
