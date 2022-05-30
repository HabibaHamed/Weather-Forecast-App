import axios from "axios";

const getUserCountryAPI = async ({ latitude, longitude }) => {
  const { data } = await axios.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=c74d96aa07b64edeb0a74b625c12a546`
  );
  return data;
};

const getWeatherAPI = async (params) => {
  const { data } = await axios.get(
    `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=abf863f4ea8c444492375135222705&format=json&aqi=yes`,
    { params }
  );
  return data;
};

const getWeatherHistoryAPI = async (params) => {
  const { data } = await axios.get(
    `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=abf863f4ea8c444492375135222705&format=json`,
    { params }
  );
  return data;
};

const getCitiesByCountryAPI = async (data) => {
  const { data: responseData } = await axios.post(
    ` https://countriesnow.space/api/v0.1/countries/states`,
    data
  );
  return responseData;
};

export {
  getUserCountryAPI,
  getWeatherAPI,
  getCitiesByCountryAPI,
  getWeatherHistoryAPI,
};
