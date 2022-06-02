import React, { useEffect } from "react";
import * as d3 from "d3";

export const useD3 = (dependency, renderGraph) => {
  const ref = React.useRef(undefined);

  useEffect(() => {
    if (dependency) renderGraph(d3.select(ref.current));
  }, [dependency, renderGraph]);

  return { ref };
};
