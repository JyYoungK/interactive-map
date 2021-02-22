import React, {createContext, useState} from 'react';

const AuthContext = createContext({}) 

const AuthProvider = (props) => {
    const [user, setUser] = useState('');
    const [mapTitle, setMapTitle] = useState('');
    const [countryData, setCountryData] = useState(["Canada"]);
    const [countries, setCountries] = useState([]);
    const [countryISOData, setCountryISOData] = useState([]);
    const [countryColorData, setCountryColorData] = useState([]);
    const [countryColor, setCountryColor] = useState("#ffff00");
    const authContextValue = {
        user, setUser,
        mapTitle, setMapTitle,
        countries, setCountries,
        countryData, setCountryData,
        countryISOData, setCountryISOData,
        countryColorData, setCountryColorData,
        countryColor, setCountryColor
  };
  return <AuthContext.Provider value= {authContextValue} {...props}/>
};

const useAuth = () => React.useContext(AuthContext);

export {AuthProvider, useAuth};