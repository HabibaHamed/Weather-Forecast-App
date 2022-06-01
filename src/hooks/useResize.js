import { useState, useEffect, useCallback } from "react";

const useResize = (ref) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleResize = useCallback(() => {
    setWidth(ref.current.getBoundingClientRect().width);
    setHeight(ref.current.getBoundingClientRect().height);
  }, [ref]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (ref.current) handleResize();
  }, [handleResize, ref]);

  return { width, height };
};

export default useResize;
