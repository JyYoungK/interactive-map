import React, { useState, useEffect } from "react";
import LoadCountries from "../LoadCountries";
import Map from "./Map";

const LoadMap = () => {
  const [countries, setCountries] = useState([]);

  const load = () => {
    const loadCountriesTask = new LoadCountries();
    loadCountriesTask.load((countries) => setCountries(countries));
  };

  useEffect(load, []);

  return (
    <div>
        <div>
            <Map countries = {countries}/>
        </div>
    </div>
  );
};

export default LoadMap;


// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { MapContainer, GeoJSON,} from "react-leaflet";
// import countries from '../data/countries.json';
// import "leaflet/dist/leaflet.css";
// import "./MyMap.css";
// import './pages.css';
// import { useAuth } from "../auth-context";
// import LoadCountries from "../LoadCountries";

// import Modal from 'react-modal';


// function useLatestCb(callback) {
//   const callbackRef = useRef(callback);
//   callbackRef.current = callback;

//   const stableCaller = useCallback((...args) => {
//     return callbackRef.current(...args);
//   }, []);

//   return stableCaller;
// }

// const Map = () => {

//   // const [countries, setCountries] = useState([]);

//   // const load = () => {
//   //   const loadCountriesTask = new LoadCountries();
//   //   loadCountriesTask.load((countries) => setCountries(countries));
//   // };

//   // useEffect(load, []);

//   const { setCountryData, countryISOData, setCountryISOData, countryColorData, setCountryColorData} = useAuth();
//   const [countryModalIsOpen, setCountryModalIsOpen] = useState(false);
//   const [color, setColor] = useState("#ffff00");
//   const modalStyle = {
//     overlay: {
//         zIndex: 5,
//     },
//     content: {
//         position: 'absolute',
//         top: '35%',
//         left: '40%',
//         right: '40%',
//         bottom: '35%',
//         border: '1px solid #ccc',
//         backgroundColor: 'white',
//         overflow: 'auto',
//         WebkitOverflowScrolling: 'touch',
//         borderRadius: '4px',
//         outline: 'none',
//         padding: '20px',
//         zIndex: 10,
//     }
//   };

//   const countryStyle = {
//       fillColor: "green", //country color
//       color: "black", // border color
//       fillOpacity: 0.5,
//       weight: 2, // border thickness
//       dashArray: 1, // if you want to make border into dashed line
//       zIndex: 1,
//   }
  
//   const changeCountryColor = (event)=> {
//         console.log(event.target)
//         if (event.target.options.fillColor === "green") { //Change Color
//             setCountryISOData([... countryISOData , { //Adds the colored country
//               ISO: event.target.feature.properties.ISO_A3,
//             }]);
            
//             event.target.setStyle(
//                 { 
//                     color: "white", //border color
//                     fillColor: color,
//                     fillOpacity: 1
//                 })
//             setCountryColorData("white");

//             setCountryColorData([... countryColorData , { //Adds the colored country
//               color: event.target.options.fillColor,
//             }]);   
//         }
//         else if (event.target.options.fillColor !== "green") { //Change Color
//            setCountryISOData(countryISOData.filter(item => item.ISO !== event.target.feature.properties.ISO_A3)); //Removes the colored country
//            event.target.setStyle(
//                 { 
//                     color: "black", //border color
//                     fillColor: "green",
//                     fillOpacity: 0.5,
//                 })

//            setCountryColorData(countryColorData.filter(item => item.color !== event.target.options.fillColor)); //Removes the colored country
//         }    
//   }
//   const latestChangeCountryColor = useLatestCb(changeCountryColor);

//   const onEachCountry = (country, layer) => {
//     const countryName = country.properties.ADMIN;
//     layer.bindPopup(countryName);
//     // layer.options.fillOpacity = 0.2; // number can go from 0-9
//     // If you want to make countries have different colors use below-------------------------
//     // const colorIndex = Math.floor(Math.random() * this.color.length);
//     // layer.options.fillColor = this.color[colorIndex]; // number can go from 0-9

//     layer.on({ //Clickable function
//           click: latestChangeCountryColor,
//     })
//     layer.on('mouseover', function() { layer.openPopup(); }); //Show country names
//     layer.on('mouseout', function() { layer.closePopup(); });
//   }


//   return (
//     <div>
//           <h1 style ={{textAlign: "center"}}> MyMap</h1>
//           <MapContainer style = {{height: "80vh", zIndex : 1}} doubleClickZoom={false} zoom = {2} minZoom = {2} center = {[50, 13]}>{/* Displays the zoom button*/}
//               <GeoJSON style = {countryStyle} data = {countries} onEachFeature={onEachCountry}/>{/*Displays the map */}
//           </MapContainer>
//           <input type = "color" value = {color} onChange={e => setColor(e.target.value)}></input>
//           {/* <input type = "color" value = {color} onChange={e => setColor(e.target.value)}></input> */}
//           {/* <Modal isOpen={countryModalIsOpen} //Modal open depends on setModal
//                       ariaHideApp={false} //Hides annoying error
//                       onRequestClose={() => setCountryModalIsOpen(false)} //Closes the modal if clicked outside of modal or esc
//                       style={ modalStyle }
//                       transparent = {false}
//                       >
//                       <div className="saveContents">
//                           <h2 style={{margin: "5%"}}> Add information to +  </h2>
//                           <p>Set color of the map </p>
//                           <input type = "color" value = {countryColor} onChange={e => setCountryColor(e.target.value)}></input>
//                           <div className="saveButtons">
//                               <button onClick = {() => colorChanged}>Save</button> 
//                               <button onClick = {() => setCountryModalIsOpen(false)}> Close </button>
//                           </div>
//                       </div>
//             </Modal> */}
//     </div> 
//   );
// }

// export default Map;