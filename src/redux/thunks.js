import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCitiesByCountryAPI,
  getUserCountryAPI,
  getWeatherAPI,
} from "./services";

export const getUserCountry = createAsyncThunk(
  "location/country",
  async (coords) => {
    try {
      const response = await getUserCountryAPI(coords);
      return response.features?.[0]?.properties;
    } catch (error) {}
  }
);

export const getCitiesByCountry = createAsyncThunk(
  "location/cities",
  async (params) => {
    try {
      const response = await getCitiesByCountryAPI(params);
      console.log(response.data);
      return response.data;
    } catch (error) {}
  }
);

export const getCountryWeather = createAsyncThunk(
  "weather/country",
  async (params) => {
    try {
      const response = await getWeatherAPI(params);
      return response.data;
    } catch (error) {}
  }
);

export const getCityWeather = createAsyncThunk(
  "weather/city",
  async (params) => {
    try {
      const response = await getWeatherAPI(params);
      return response.data;
    } catch (error) {}
  }
);

export const getCityWeatherHistory = createAsyncThunk(
  "weather/city/history",
  async (params) => {
    try {
      const response = await getWeatherAPI(params);
      return response.data;
    } catch (error) {}
  }
);
