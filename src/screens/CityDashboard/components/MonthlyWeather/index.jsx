import { useRef } from "react";
import { useD3 } from "../../../../hooks/useD3";
import useResize from "../../../../hooks/useResize";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { selectCurrentCityWeather } from "../../../../redux/selectors";
import "../../index.scss";

const HEIGHT = 300;
const margin = { top: 10, right: 0, bottom: 30, left: 15 };

const MonthlyWeather = () => {
  const refContainer = useRef(null);
  const { width } = useResize(refContainer);
  const WIDTH = width > 0 ? width - 20 : width;
  const { ClimateAverages = [] } = useSelector(selectCurrentCityWeather) || {};

  const { month: monthlyAverages = [] } = ClimateAverages[0] || {};

  const { ref: graphRef } = useD3(monthlyAverages, (graph) => {
    graph.selectAll("svg").remove();
    const svg = graph
      .append("svg")
      .attr("width", WIDTH + margin.left + margin.right)
      .attr("height", HEIGHT + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x_scale = d3
      .scaleBand()
      .range([margin.left, WIDTH - margin.right])
      .padding(0.1);

    const y_scale = d3
      .scaleLinear()
      .range([HEIGHT - margin.bottom, margin.top]);

    const adjustedWeather = monthlyAverages.map((d) => ({
      ...d,
      avgDailyRainfall: +d.avgDailyRainfall * 100,
    }));

    x_scale.domain(adjustedWeather.map((d) => d.name));
    y_scale.domain([0, d3.max(adjustedWeather, (d) => d.avgDailyRainfall)]);

    svg
      .append("path")
      .datum(adjustedWeather)
      .attr("fill", "none")
      .attr("stroke", "#e3830e")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x_scale(d.name))
          .y((d) => y_scale(d.avgDailyRainfall))
      );

    svg
      .append("g")
      .selectAll("dot")
      .data(adjustedWeather)
      .enter()
      .append("circle")
      .attr("cx", (d) => x_scale(d.name))
      .attr("cy", (d) => y_scale(d.avgDailyRainfall))
      .attr("r", 5)
      .attr("fill", "#e3830e");

    let x_axis = d3.axisBottom(x_scale);

    let y_axis = d3.axisLeft(y_scale);

    svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT - margin.bottom})`)
      .call(x_axis)
      .selectAll("text")
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

  return (
    <div
      className="card-dashboard-highlights card-dashboard-history"
      ref={refContainer}
    >
      <div ref={graphRef} />
    </div>
  );
};

export default MonthlyWeather;
