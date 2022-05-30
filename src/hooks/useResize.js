import { useState, useEffect } from "react";

const useResize = (ref) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      console.log("ref width", ref.current.offsetWidth);
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return { width, height };
};

export default useResize;
