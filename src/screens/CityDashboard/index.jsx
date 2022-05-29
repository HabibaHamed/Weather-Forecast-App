import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentCityWeather } from "../../redux/selectors";
import { getCityWeather } from "../../redux/thunks";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import "./index.scss";
import UVGraph from "./components/UVGraph";

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
  const { temp_C, weatherDesc } = current_condition?.[0] || {};

  console.log(params.city);

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
          <MdDateRange />
          <span>{currentDate}</span>
        </div>
        <div className="icon-text-item">
          <MdLocationPin />
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
          <UVGraph />
          <UVGraph />
          <UVGraph />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
