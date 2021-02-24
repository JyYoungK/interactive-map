import React, {createContext, useState} from 'react';

const AuthContext = createContext({}) 

const AuthProvider = (props) => {
    const [user, setUser] = useState('');
    const [mapTitle, setMapTitle] = useState([]);
    const [myMapTitle, setMyMapTitle] = useState("");
    const [countryISOData, setCountryISOData] = useState([]);
    const [countryColorData, setCountryColorData] = useState([]);
    const [coloredMap, setColoredMap] = useState([]);
    const [changeColor, setChangeColor] = useState("#ffff00");
    const [countryColor, setCountryColor] = useState("");
    const authContextValue = {
        user, setUser,
        mapTitle, setMapTitle,
        myMapTitle, setMyMapTitle,
        countryISOData, setCountryISOData,
        changeColor, setChangeColor,
        countryColorData, setCountryColorData,
        countryColor, setCountryColor,
        coloredMap, setColoredMap,
  };
  return <AuthContext.Provider value= {authContextValue} {...props}/>
};

const useGlobalState = () => React.useContext(AuthContext);

export {AuthProvider, useGlobalState};