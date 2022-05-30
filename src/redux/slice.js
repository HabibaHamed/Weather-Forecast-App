import { createSlice } from "@reduxjs/toolkit";
import {
  getCitiesByCountry,
  getCityWeather,
  getCityWeatherHistory,
  getCountryWeather,
  getUserCountry,
} from "./thunks";

const slice = createSlice({
  name: "weatherSlice",
  initialState: {
    country: undefined,
    countryWeather: undefined,
    cities: [],
    cityWeather: undefined,
    cityWeatherHistory: undefined,
  },
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
      })
      .addCase(getCityWeather.fulfilled, (state, action) => {
        state.cityWeather = action.payload;
      })
      .addCase(getCityWeatherHistory.fulfilled, (state, action) => {
        state.cityWeatherHistory = action.payload;
      });
  },
});

export default slice;
