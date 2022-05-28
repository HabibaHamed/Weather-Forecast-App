import { createSelector } from "@reduxjs/toolkit";

export const selectCountry = createSelector(
  (state) => state.weather,
  (weather) => weather.country
);

export const selectCountryWeather = createSelector(
  (state) => state.weather,
  (weather) => weather.countryWeather
);

export const selectCities = createSelector(
  (state) => state.weather,
  (weather) => weather.cities
);
