import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useD3 } from "../../../../hooks/useD3";
import { selectCurrentCityWeather } from "../../../../redux/selectors";
import * as d3 from "d3";

const UVGraph = () => {
  const { current_condition } = useSelector(selectCurrentCityWeather) || {};
  const { uvIndex } = current_condition?.[0] || {};

  const { ref: graphRef, render } = useD3((graph) => {
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
      .attr("fill", "#FF8C00");
    svg.append("text").attr("x", 100).attr("y", 80).text(uvIndex);
  });

  useEffect(() => {
    if (uvIndex) render();
  }, [uvIndex]);

  console.log(graphRef);
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <p style={{ fontWeight: "bold" }}>UV Index</p>
      <div ref={graphRef} style={{ margin: "auto", width: "fit-content" }} />
    </div>
  );
};

export default UVGraph;
