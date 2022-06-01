import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentCityWeather } from "../../redux/selectors";
import { getCityWeather } from "../../redux/thunks";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import UVGraph from "./components/UVGraph";
import HumidityGraph from "./components/HumidityGraph";
import HistoryWeather from "./components/HistoryWeather";
import MonthlyWeather from "./components/MonthlyWeather";
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

  const dashboardCard = (
    title,
    value,
    fontSize = "40px",
    marginBottom = "16px"
  ) => (
    <div className="card-dashboard-highlights">
      <p style={{ marginBottom }} className="card-title">
        {title}
      </p>
      <h2 style={{ fontSize }}>{value}</h2>
    </div>
  );

  useEffect(() => {
    if (params.country && params.city)
      dispatch(getCityWeather({ q: `${params.country}+${params.city}` }));
  }, [dispatch, params]);

  return (
    <main>
      <div className="dashboard-container">
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
            Today's Highlights
          </h3>
          <div className="weather-highlights">
            {FeelsLikeC && dashboardCard("Feels Like", `${FeelsLikeC}\u2103`)}
            <UVGraph />
            {windspeedKmph &&
              dashboardCard("Wind Status", `${windspeedKmph}km/h`)}
            <HumidityGraph />
            {visibility && dashboardCard("Visibility", `${visibility}km`)}
            {airQualityEPA &&
              dashboardCard(
                "Air Quality",
                airQualityEPA[aqIndex],
                "25px",
                "40px"
              )}
          </div>
          <h3 className="summary-section-title">Last Month Temperature</h3>
          <HistoryWeather />
          <h3 className="summary-section-title">
            Monthly Average Daily Rainfall(mm)
          </h3>
          <MonthlyWeather />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
