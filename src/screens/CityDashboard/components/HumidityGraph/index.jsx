import { useSelector } from "react-redux";
import { useD3 } from "../../../../hooks/useD3";
import { selectCurrentCityWeather } from "../../../../redux/selectors";
import "../../index.scss";

const HumidityGraph = () => {
  const { current_condition } = useSelector(selectCurrentCityWeather) || {};
  const { humidity } = current_condition?.[0] || {};

  const { ref: graphRef } = useD3(humidity, (graph) => {
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
      .attr("fill", "#e3830e");

    svg
      .append("text")
      .attr("x", 85)
      .attr("y", 80)
      .attr("font-weight", "bold")
      .text(`${humidity}%`);
  });

  return (
    <div className="card-dashboard-highlights">
      <p className="card-title">Humidity</p>
      <div ref={graphRef} style={{ margin: "auto", width: "fit-content" }} />
    </div>
  );
};

export default HumidityGraph;
