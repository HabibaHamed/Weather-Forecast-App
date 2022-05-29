import React from "react";
import * as d3 from "d3";

export const useD3 = (renderGraph) => {
  const ref = React.useRef(undefined);

  const render = () => renderGraph(d3.select(ref.current));

  return { ref, render };
};
