import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentCityWeather } from "../../redux/selectors";
import { getCityWeather } from "../../redux/thunks";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import UVGraph from "./components/UVGraph";
import HumidityGraph from "./components/HumidityGraph";
import HistoryWeather from "./components/HistoryWeather";
import "./index.scss";

const airQualityEPA = {
  1: "Good",
  2: "Moderate",
  3: "Unhealthy for sensitive group",
  4: "Unhealthy",
  5: "Very Unhealthy",
  6: "Hazardous",
};

const Dashboard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { current_condition } = useSelector(selectCurrentCityWeather) || {};
  const {
    temp_C,
    weatherDesc,
    FeelsLikeC,
    visibility,
    windspeedKmph,
    air_quality,
  } = current_condition?.[0] || {};

  const aqIndex = air_quality?.["us-epa-index"];

  const dashboardCard = (title, value, fontSize = "40px") => (
    <div className="card-dashboard-highlights">
      <p className="card-title">{title}</p>
      <h2 style={{ fontSize }}>{value}</h2>
    </div>
  );

  useEffect(() => {
    if (params.country && params.city)
      dispatch(getCityWeather({ q: `${params.country}+${params.city}` }));
  }, [dispatch, params]);

  return (
    <main className="dashboard-container">
      <div className="header-container">
        <h1>{temp_C}&#8451;</h1>
        <p className="weather-description">{weatherDesc?.[0]?.value}</p>
        <div className="icon-text-item">
          <MdDateRange size={20} />
          <span>{currentDate}</span>
        </div>
        <div className="icon-text-item">
          <MdLocationPin size={20} />
          <span>
            {params.country}, {params.city}
          </span>
        </div>
      </div>
      <div className="summary-container">
        <h3 style={{ color: "rgba(0, 0, 0, 0.5)", marginTop: 0 }}>
          Highlights
        </h3>
        <div className="weather-highlights">
          {dashboardCard("Feels Like", `${FeelsLikeC}\u2103`)}
          <UVGraph />
          {dashboardCard("Wind Status", `${windspeedKmph}km/h`)}
          <HumidityGraph />
          {dashboardCard("Visibility", `${visibility}km`)}
          {dashboardCard("Air Quality", airQualityEPA[aqIndex], "25px")}
        </div>
        <HistoryWeather />
      </div>
    </main>
  );
};

export default Dashboard;
