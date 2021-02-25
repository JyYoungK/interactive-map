import React, { useEffect } from "react";
import { useGlobalState } from "../global-context";
import Map from "./Map";

const LoadMap = () => {
  const {coloredMap} = useGlobalState();
  useEffect(() => { //the point is to fire off a side effect that should fire after a state value changes (since it depends on that state value).
  }, coloredMap, [])

  return (
      <div>
          <Map/>
      </div>
  );
}

export default LoadMap;