import React, {createContext, useState} from 'react';

const AuthContext = createContext({}) 

const AuthProvider = (props) => {
    const [user, setUser] = useState('');
    const [mapTitle, setMapTitle] = useState('');
    const [SelectMapTitle, setSelectMapTitle] = useState([]);
    const [countryISOData, setCountryISOData] = useState([]);
    const [countryColorData, setCountryColorData] = useState([]);
    const [countryColor, setCountryColor] = useState("#ffff00");
    const authContextValue = {
        user, setUser,
        mapTitle, setMapTitle,
        countryISOData, setCountryISOData,
        countryColorData, setCountryColorData,
        countryColor, setCountryColor,
        SelectMapTitle, setSelectMapTitle
  };
  return <AuthContext.Provider value= {authContextValue} {...props}/>
};

const useAuth = () => React.useContext(AuthContext);

export {AuthProvider, useAuth};