import React, {createContext, useState} from 'react';

const AuthContext = createContext({}) 

const AuthProvider = (props) => {
    const [user, setUser] = useState('');
    const [mapTitle, setMapTitle] = useState([]);
    const [myMapTitle, setMyMapTitle] = useState("");
    const [countryText, setCountryText] = useState("");
    const [countryData, setCountryData] = useState([]);
    // const [countryColorData, setCountryColorData] = useState([]);
    const [coloredMap, setColoredMap] = useState([]);
    const [changeColor, setChangeColor] = useState("#ffff00");
    const [countryColor, setCountryColor] = useState("");
    const [countryEvent, setCountryEvent] = useState([]);

    const authContextValue = {
        user, setUser,
        mapTitle, setMapTitle,
        myMapTitle, setMyMapTitle,
        countryData, setCountryData,
        changeColor, setChangeColor,
        countryColor, setCountryColor,
        coloredMap, setColoredMap,
        countryText, setCountryText,
        countryEvent, setCountryEvent,
  };
  return <AuthContext.Provider value= {authContextValue} {...props}/>
};

const useGlobalState = () => React.useContext(AuthContext);

export {AuthProvider, useGlobalState};