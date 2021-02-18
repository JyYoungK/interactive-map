import React, {createContext, useState, useEffect } from 'react';
import fire from './config/fire'

const AuthContext = createContext({}) 

const AuthProvider = (props) => {
  const [countryData, setCountryData] = useState();
  const authContextValue = {
    countryData,
    setCountryData,
  };
  
  return <AuthContext.Provider value= {authContextValue} {...props}/>
}

const useAuth = () => React.useContext(AuthContext);

export {AuthProvider, useAuth};