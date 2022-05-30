import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useD3 } from "../../../../hooks/useD3";
import { selectCurrentCityWeather } from "../../../../redux/selectors";
import "../../index.scss";

const HumidityGraph = () => {
  const { current_condition } = useSelector(selectCurrentCityWeather) || {};
  const { humidity } = current_condition?.[0] || {};

  const { ref: graphRef, render } = useD3((graph) => {
    graph.selectAll("svg").remove();
    const humidityWidth = (humidity / 100) * 200;
    const svg = graph.append("svg").attr("width", 180).attr("height", 105);

    svg
      .append("rect")
      .attr("transform", "translate(0,30)")
      .attr("width", 180)
      .attr("height", 15)
      .attr("fill", "#DCDCDC");
    svg
      .append("rect")
      .attr("transform", "translate(0,30)")
      .attr("width", humidityWidth)
      .attr("height", 15)
      .attr("fill", "#FF8C00");

    svg.append("text").attr("x", 85).attr("y", 80).text(`${humidity}%`);
  });

  useEffect(() => {
    if (humidity) render();
  }, [humidity]);

  return (
    <div className="card-dashboard-highlights">
      <p className="card-title">Humidity</p>
      <div ref={graphRef} style={{ margin: "auto", width: "fit-content" }} />
    </div>
  );
};

export default HumidityGraph;
