import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MapContainer, GeoJSON,} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import './pages.css';
import { useGlobalState } from "../auth-context";

function useLatestCb(callback) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const stableCaller = useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);

  return stableCaller;
}

const Map = () => {

  const { myMapTitle, countryISOData, setCountryISOData, changeColor, coloredMap, setColoredMap, countryColorData, setCountryColorData} = useGlobalState();

  useEffect(() => { //the point is to fire off a side effect that should fire after a state value changes (since it depends on that state value).
    setColoredMap(coloredMap)}, [])

  const countryStyle = {
      fillColor: "green", //country color
      color: "black", // border color
      fillOpacity: 0.5,
      weight: 2, // border thickness
      dashArray: 1, // if you want to make border into dashed line
      zIndex: 1,
  }

  const changeCountryColor = (event)=> {
        if (event.target.options.fillColor === "green") { //Change Color
            setCountryISOData([... countryISOData , { //Adds the colored country
              ISO: event.target.feature.properties.ISO_A3,
            }]);
            
            event.target.setStyle(
                { 
                    color: "white", //border color
                    fillColor: changeColor,
                    fillOpacity: 1
                })
            setCountryColorData("white");

            setCountryColorData([... countryColorData , { //Adds the colored country
              color: event.target.options.fillColor,
            }]);   
        }
        else if (event.target.options.fillColor !== "green") { //Change Color
           setCountryISOData(countryISOData.filter(item => item.ISO !== event.target.feature.properties.ISO_A3)); //Removes the colored country
           event.target.setStyle(
                { 
                    color: "black", //border color
                    fillColor: "green",
                    fillOpacity: 0.5,
                })

           setCountryColorData(countryColorData.filter(item => item.color !== event.target.options.fillColor)); //Removes the colored country
        }    
  }
  const latestChangeCountryColor = useLatestCb(changeCountryColor);

  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const countryName = country.properties.ADMIN;
    const confirmedText = country.properties.confirmedText;
    layer.bindPopup(countryName);
    // layer.options.fillOpacity = 0.2; // number can go from 0-9
    // If you want to make countries have different colors use below-------------------------
    // const colorIndex = Math.floor(Math.random() * this.color.length);
    // layer.options.fillColor = this.color[colorIndex]; // number can go from 0-9

    layer.on({ //Clickable function
          click: latestChangeCountryColor,
    })
    layer.on('mouseover', function() { layer.openPopup(); }); //Show country names
    layer.on('mouseout', function() { layer.closePopup(); });
  }

  console.log(coloredMap);

  return (
    <div>
          <h1 style ={{textAlign: "center"}}> {myMapTitle} </h1>
          <MapContainer style = {{height: "80vh", zIndex : 1}} doubleClickZoom={false} zoom = {2} minZoom = {2} center = {[50, 13]}>{/* Displays the zoom button*/}
              <GeoJSON style = {countryStyle} onEachFeature={onEachCountry} data = {coloredMap} />{/*Displays the map */}
          </MapContainer>
    </div> 
  );
}

export default Map;
