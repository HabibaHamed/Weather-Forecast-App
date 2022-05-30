import { useEffect, useRef } from "react";
import { useD3 } from "../../../../hooks/useD3";
import useResize from "../../../../hooks/useResize";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import { getCityWeatherHistory } from "../../../../redux/thunks";
import { useParams } from "react-router-dom";
import { selectCityWeatherHistory } from "../../../../redux/selectors";

const HistoryWeather = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const refContainer = useRef(null);
  const { width, height } = useResize(refContainer);
  const { weather = [] } = useSelector(selectCityWeatherHistory) || {};

  const { ref: graphRef, render } = useD3((graph) => {
    const margin = { top: 20, right: 0, bottom: 100, left: 20 };
    graph.selectAll("svg").remove();
    const svg = graph.append("svg").attr("width", 700).attr("height", 300);

    const x_scale = d3
      .scaleBand()
      .range([margin.left, 700 - margin.right])
      .padding(0.1);

    const y_scale = d3.scaleLinear().range([300 - margin.bottom, margin.top]);

    const adjustedWeather = weather.map((d) => ({
      ...d,
      avgTemp: +d.avgtempC,
    }));
    console.log(adjustedWeather);

    x_scale.domain(adjustedWeather.map((d) => d.date));
    y_scale.domain([0, d3.max(adjustedWeather, (d) => d.avgTemp)]);

    svg
      .selectAll("rect")
      .data(adjustedWeather)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x_scale(d.date))
      .attr("y", (d) => y_scale(d.avgTemp))
      .attr("width", x_scale.bandwidth())
      .attr("height", (d) => 200 - y_scale(d.avgTemp));

    let x_axis = d3.axisBottom(x_scale);

    let y_axis = d3.axisLeft(y_scale);

    svg
      .append("g")
      .attr("transform", `translate(0,${300 - margin.bottom})`)
      .call(x_axis)
      .selectAll("text") // everything from this point is optional
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // add y axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(y_axis);
  });

  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(
      Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1)
    );
    console.log(currentDate, startDate);
    dispatch(
      getCityWeatherHistory({
        q: `${params.country}+${params.city}`,
        date: startDate.toISOString().split("T")[0],
        endDate: currentDate.toISOString().split("T")[0],
      })
    );
  }, [dispatch, params]);

  useEffect(() => {
    if (weather) render();
  }, [weather]);

  return (
    <div
      className="card-dashboard-highlights"
      ref={refContainer}
      style={{ width: "100%", display: "table" }}
    >
      <div ref={graphRef} />
    </div>
  );
};

export default HistoryWeather;
