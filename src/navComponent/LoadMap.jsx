import React, { useEffect } from "react";
import { features } from "../data/countries.json";
import { useAuth } from "../auth-context";
import Map from "./Map";

const LoadMap = () => {
  const {countryISOData, countryColorData} = useAuth();
  const countries = [];

  const load = () => {
    for (let i = 0; i < features.length; i++) {
      const country = features[i];
      if(country.properties.color === undefined){
        country.properties.color = "green";
      }
      for (let j = 0; j < countryISOData.length; j++){
        if (country.properties.ISO_A3 === countryISOData[j]){
          country.properties.color = countryColorData[j];
        }
      }
      countries.push(country);
    }
  };
  load();

  return (
      <div>
          <Map countries = {countries}/>
      </div>
  );
};

export default LoadMap;

// const LoadMap = () => {
//   const {countryISOData, countryColorData} = useAuth();

//   const countries = features.map((country) => ({
//     ...country,
//     properties: {
//       ...country.properties,
//       color:
//         countryISOData.indexOf(country.properties.ISO_A3) !== -1
//           ? "red"

//           : "green",
//     },
//   }));

//   return (
//       <div>
//           <Map countries = {countries}/>
//       </div>
//   );
// };

// export default LoadMap;

