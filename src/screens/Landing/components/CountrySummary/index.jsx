import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryWeather } from "../../../../redux/thunks";
import {
  selectCountry,
  selectCountryWeather,
} from "../../../../redux/selectors";
import "./index.scss";

const CountrySummary = () => {
  const country = useSelector(selectCountry);

  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { current_condition = [], weather = [] } =
    useSelector(selectCountryWeather) || {};

  const dispatch = useDispatch();

  const {
    weatherIconUrl,
    temp_C,
    FeelsLikeC,
    humidity,
    windspeedKmph,
    weatherDesc,
    uvIndex,
  } = current_condition[0] || {};

  const { sunset, sunrise } = weather[0]?.astronomy?.[0] || {};

  useEffect(() => {
    if (country) {
      dispatch(
        getCountryWeather({
          q: country,
        })
      );
    }
  }, [country, dispatch]);

  return (
    <div className="country-summary-card">
      <h1 className="country-title">{country}</h1>
      <p>{currentDate}</p>
      <div className="summary-content">
        <img src={weatherIconUrl?.[0]?.value} alt="weather-icon" />
        <div>
          <div className="temp-title">{temp_C}&#8451;</div>
          <div>{weatherDesc?.[0]?.value}</div>
        </div>
        <div className="summary-grid">
          <div className="grid-item">
            <p>{FeelsLikeC} &#8451;</p>
            <span>Feels like</span>
          </div>
          <div className="grid-item">
            <p>{windspeedKmph} Km/h</p>
            <span>Wind</span>
          </div>
          <div className="grid-item">
            <p>{sunset}</p>
            <span>Sunset</span>
          </div>
          <div className="grid-item">
            <p>{humidity} %</p>
            <span>Humidity</span>
          </div>
          <div className="grid-item">
            <p>{uvIndex}</p>
            <span>UV Index</span>
          </div>
          <div className="grid-item">
            <p>{sunrise}</p>
            <span>Sunrise</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySummary;
