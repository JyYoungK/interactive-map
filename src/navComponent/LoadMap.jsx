import React, { useEffect } from "react";
import { features } from "../data/countries.json";
import { useAuth } from "../auth-context";
import Map from "./Map";

const LoadMap = () => {
  const {setColoredMap, countryISOData, countryColorData, coloredMap} = useAuth();
  // const countries = [];
  useEffect(() => { //the point is to fire off a side effect that should fire after a state value changes (since it depends on that state value).
  }, coloredMap, [])

  return (
      <div>
          <Map/>
      </div>
  );
}

export default LoadMap;