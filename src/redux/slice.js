import { createSlice } from "@reduxjs/toolkit";
import {
  getCitiesByCountry,
  getCountryWeather,
  getUserCountry,
} from "./thunks";

const slice = createSlice({
  name: "weatherSlice",
  initialState: { country: undefined, countryWeather: undefined, cities: [] },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCountry.fulfilled, (state, action) => {
        state.country = action.payload.country;
      })
      .addCase(getCountryWeather.fulfilled, (state, action) => {
        state.countryWeather = action.payload;
      })
      .addCase(getCitiesByCountry.fulfilled, (state, action) => {
        state.cities = action.payload.states;
      });
  },
});

export default slice;
