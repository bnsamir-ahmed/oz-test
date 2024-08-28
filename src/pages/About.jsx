import React from "react";
import AboutHeader from "../components/About/AboutHeader/AboutHeader";
import AboutOz from "../components/About/AboutOz/AboutOz";
import { useQuery } from "@tanstack/react-query";
import { config } from "../apis/config";

const About = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["about-us"],
    queryFn: ({ signal }) => config("about_us", signal),
  });

  const getComponentValue = (param) => {
    const matchingItems = data?.filter((ele) => ele.key.match(param));
    return matchingItems;
  };

  return (
    <>
      <AboutHeader configData={getComponentValue("about_us_page")} pending={isPending} />
      <AboutOz configData={getComponentValue("about_us_page")} pending={isPending} />
    </> 
  );
};

export default React.memo(About);
