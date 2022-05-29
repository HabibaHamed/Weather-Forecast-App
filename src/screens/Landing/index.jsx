import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserCountry } from "../../redux/thunks";
import CitiesList from "./components/CitiesList";
import CountrySummary from "./components/CountrySummary";
import LandingCard from "./components/LandingCard";
import "./index.scss";

const Landing = () => {
  const dispatch = useDispatch();
  const onLocationSuccess = useCallback(
    ({ coords }) => {
      dispatch(getUserCountry(coords));
    },
    [dispatch]
  );

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(onLocationSuccess);
  }, [onLocationSuccess]);

  return (
    <main className="landing-container">
      <LandingCard />
      <CountrySummary />
      <CitiesList />
    </main>
  );
};

export default Landing;
