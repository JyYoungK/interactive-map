import React, { useState, useEffect} from 'react';
import fire from './config/fire'
import "./App.css";
import Login from './Login';
import Home from './Home';
import firebase from 'firebase';
import { useAuth } from "./auth-context";
import { features } from "./data/countries.json";

export default function App (){
  const { user, setUser, mapTitle, countryData, countries, setCountries, countryISOData, countryColorData } = useAuth();
  // const [user, setUser] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  var database = firebase.database();


  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch((err) => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
    };


  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .catch((err) => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
    };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const save = () => {
    console.log("Successfully saved data under " + user.uid);
    // console.log ("Map Name: " + mapTitle);
    // console.log ("Map Color: " + countryColorData);
    // console.log ("Map Name: " + countryObjData[1]);

    var usersRef = database.ref("users");
    var userExists = database.ref("users/User:" + user.uid + "/Map:" + mapTitle);

    userExists.once("value")
    .then(function(userinDB){
        for (var i = 0; i < countryISOData.length; i++) {
          if (userinDB.exists()){ //if a map exists under a username 
            //1. Choose to update 
            firebase.database().ref("users/User:" + user.uid + '/Map:' + mapTitle + '/Obj' + i).update({
              CountryISO: countryISOData[i],
              CountryColor: countryColorData[i],

            });
          }
          else{ //Create a new map under a username
            usersRef.child("User:" + user.uid).child("Map:" + mapTitle + '/Obj' + i).update({
              CountryName: countryISOData[i],
              CountryColor: countryColorData[i],

            });
          }
        }
    });
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
          clearInputs();
          setUser(user);
        }
        else {
          setUser("");
        }
    });
  };
 
  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="App">
      {user ? (
        <Home handleLogout={handleLogout} save={save}/>
      ) : (
        <Login 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}

    </div>
  );

}

