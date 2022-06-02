import { useSelector } from "react-redux";
import { useD3 } from "../../../../hooks/useD3";
import { selectCurrentCityWeather } from "../../../../redux/selectors";
import * as d3 from "d3";
import "../../index.scss";

const UVGraph = () => {
  const { current_condition } = useSelector(selectCurrentCityWeather) || {};
  const { uvIndex } = current_condition?.[0] || {};

  const { ref: graphRef } = useD3(uvIndex, (graph) => {
    graph.selectAll("svg").remove();
    const uvAngle = (uvIndex / 12) * 3.14 - 1.57;
    const svg = graph.append("svg").attr("width", 210).attr("height", 105);

    svg
      .append("path")
      .attr("transform", "translate(105,105)")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(85)
          .outerRadius(95)
          .startAngle(-1.57)
          .endAngle(1.57)
      )
      .attr("fill", "#DCDCDC");
    svg
      .append("path")
      .attr("transform", "translate(105,105)")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(85)
          .outerRadius(95)
          .startAngle(-1.57)
          .endAngle(uvAngle)
      )
      .attr("fill", "#e3830e");
    svg
      .append("text")
      .attr("x", 100)
      .attr("y", 80)
      .attr("font-weight", "bold")
      .text(uvIndex);
  });

  return (
    <div className="card-dashboard-highlights">
      <p className="card-title">UV Index</p>
      <div ref={graphRef} style={{ margin: "auto", width: "fit-content" }} />
    </div>
  );
};

export default UVGraph;
