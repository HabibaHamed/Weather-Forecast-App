import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryWeather } from "../../../../redux/thunks";
import {
  selectCountry,
  selectCountryWeather,
} from "../../../../redux/selectors";

import { TiWeatherWindyCloudy } from "react-icons/ti";
import { BsThermometerSun, BsSunrise, BsSunset } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import "./index.scss";

const CountrySummary = () => {
  const country = useSelector(selectCountry);

  const { current_condition = [], weather = [] } =
    useSelector(selectCountryWeather) || {};

  const dispatch = useDispatch();

  const { FeelsLikeC, humidity, windspeedKmph, uvIndex } =
    current_condition[0] || {};

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
      <div className="summary-grid">
        <div className="grid-item">
          <FaTemperatureHigh size={60} />
          <div>
            <span>Feels like</span>
            <p>{FeelsLikeC} &#8451;</p>
          </div>
        </div>
        <div className="grid-item">
          <TiWeatherWindyCloudy size={60} />
          <div>
            <span>Wind</span>
            <p>{windspeedKmph} Km/h</p>
          </div>
        </div>
        <div className="grid-item">
          <BsSunset size={60} />
          <div>
            <span>Sunset</span>
            <p>{sunset}</p>
          </div>
        </div>
        <div className="grid-item">
          <WiHumidity size={60} />
          <div>
            <span>Humidity</span>
            <p>{humidity} %</p>
          </div>
        </div>
        <div className="grid-item">
          <BsThermometerSun size={60} />
          <div>
            <span>UV Index</span>
            <p>{uvIndex}</p>
          </div>
        </div>
        <div className="grid-item">
          <BsSunrise size={60} />
          <div>
            <span>Sunrise</span>
            <p>{sunrise}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySummary;
