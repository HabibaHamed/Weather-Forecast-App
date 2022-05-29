import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCitiesByCountry } from "../../../../redux/thunks";
import { selectCities, selectCountry } from "../../../../redux/selectors";
import "./index.scss";
import { Link } from "react-router-dom";

const CitiesList = () => {
  const country = useSelector(selectCountry);
  const cities = useSelector(selectCities);

  const dispatch = useDispatch();

  useEffect(() => {
    if (country) {
      dispatch(getCitiesByCountry({ country }));
    }
  }, [country, dispatch]);

  return (
    <section className="cities-list-card">
      {cities.map((city) => (
        <Link to={`/dashboard/${country}/${city.name}`}>
          <span>{city.name}</span>
        </Link>
      ))}
    </section>
  );
};

export default CitiesList;
