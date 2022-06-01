import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryWeather } from "../../../../redux/thunks";
import {
  selectCountry,
  selectCountryWeather,
} from "../../../../redux/selectors";
import "./index.scss";

const LandingCard = () => {
  const country = useSelector(selectCountry);

  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { current_condition = [] } = useSelector(selectCountryWeather) || {};

  const dispatch = useDispatch();

  const { temp_C, weatherDesc } = current_condition[0] || {};

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
    <div className="landing-country-card">
      <h1 className="country-title">{country}</h1>
      <p className="temp-title">{temp_C}&#8451;</p>
      <p>{currentDate}</p>
      <p>{weatherDesc?.[0]?.value}</p>
    </div>
  );
};

export default LandingCard;
