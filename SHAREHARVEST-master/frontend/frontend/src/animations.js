import { useEffect } from "react";

export const fadeIn = "opacity-0 transition-opacity duration-500 ease-in-out";
export const animateFadeIn = (element) => {
  useEffect(() => {
    element.current.classList.remove("opacity-0");
    element.current.classList.add("opacity-100");
  }, [element]);
};