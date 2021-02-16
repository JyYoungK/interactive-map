import React, { Component } from 'react';
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import countries from '../data/countries.json';
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

class MyMap extends Component {
    state = { color: "#ffff00" };

    color = ["green", "blue", "orange", "grey", "red", "purple", "yellow", "brown", "pink"]

    countryStyle = {
        fillColor: "green", //country color
        fillOpacity: 1, // number can go from 0-1
        color: "black", // border color
        weight: 2, // border thickness
        dashArray: 1, // if you want to make border into dashed line
    }

    changeCountryColor = (event)=> {
        if (event.target.options.fillColor === "green") { //Change Color
            event.target.setStyle(
                { 
                    color: "white", //border color
                    fillColor: this.state.color,
                    fillOpacity: 0.5,
                }
            )
        }
        else if (event.target.options.fillColor !== "green") { //Change Color
            event.target.setStyle(
                { 
                    color: "black", //border color
                    fillColor: "green",
                    fillOpacity: 1,
                }
            )
        }
    }

    onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        layer.bindPopup(countryName + " ");
        // layer.options.fillOpacity = 0.2; // number can go from 0-9
        // If you want to make countries have different colors use below-------------------------
        // const colorIndex = Math.floor(Math.random() * this.color.length);
        // layer.options.fillColor = this.color[colorIndex]; // number can go from 0-9

        layer.on({ //Clickable function
            click: this.changeCountryColor,
        })
        layer.on('mouseover', function() { layer.openPopup(); }); //Show country names
        layer.on('mouseout', function() { layer.closePopup(); });
    }
    
    colorChange = (event) => {
        this.setState({color: event.target.value});
    }

    render() { 
        return ( 
        <div>
            <h1 style ={{textAlign: "center"}}> MyMap</h1>
            <MapContainer style = {{height: "80vh" }} zoom = {1} minZoom = {1} center = {[50, 13]}>{/* Displays the zoom button*/}
                <GeoJSON style = {this.countryStyle} data = {countries.features} onEachFeature={this.onEachCountry}/>{/* Displays the map*/}
            </MapContainer>
            <input type = "color" value = {this.state.color} onChange={this.colorChange}></input>
        </div> 
        );
    }
}
 
export default MyMap;