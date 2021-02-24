import React, { useState, useEffect} from 'react';
import fire from './config/fire'
import "./App.css";
import Login from './Login';
import Home from './Home';
import firebase from 'firebase';
import { useAuth } from "./auth-context";
import { features } from "./data/countries.json";

export default function App (){
  const { user, setUser, mapTitle, setMapTitle, countryISOData, countryColorData, setColoredMap, coloredMap, setCountryISOData, setCountryColorData} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  var database = firebase.database();
  const countries = [];

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
    console.log("Successfully saved "+ mapTitle +" under " + user.uid);
    var usersRef = database.ref("users");
    var userExists = database.ref("users/User:" + user.uid + "/" + mapTitle);

    userExists.once("value")
    .then(function(userinDB){
        for (var i = 0; i < countryISOData.length; i++) {
          if (userinDB.exists()){ //if a map exists under a username 
            //1. Choose to update 
            firebase.database().ref("users/User:" + user.uid + '/' + mapTitle + '/Obj' + i).update({
              CountryISO: countryISOData[i],
              CountryColor: countryColorData[i],
            });
          }
          else{ //Create a new map under a username
            usersRef.child("User:" + user.uid).child(mapTitle + '/Obj' + i).update({
              CountryISO: countryISOData[i],
              CountryColor: countryColorData[i],
            });
          }
        }
    });
  }

  //Before learning this does not update the state right away
  // const preload = () => {
  //   var Dataref = database.ref("users/User:" + user.uid);
  //   var nameData = [];
  //   Dataref.on("value", function(objData) {
  //     objData.forEach((function(child) {
  //       nameData.push(child.key)})
  //     )
  //   });
  //   setMapTitle(nameData);
  // }
  
  //After learning
  // useEffect(() => { //the point is to fire off a side effect that should fire after a state value changes (since it depends on that state value).
  // }, mapTitle, [])

  useEffect(() => {
    const load = () => {
      for (let i = 0; i < features.length; i++) {
        const country = features[i];
        if(country.properties.color === undefined){
          country.properties.color = "green";
        }
        countries.push(country)
      }
      setColoredMap(countries); 
    }
    load();
  }, []);

  const preload = () => {
    setMapTitle([]); //Resets so that it doesn't add up.
    var Dataref = database.ref("users/User:" + user.uid);
    let toAdd = []
    Dataref.on("value", function(objData) {
      objData.forEach((function(child) { //never put setState inside a loop. Also this is same function as
        toAdd.push(child.key)     
      }))
      console.log("Loading following Map Titles: " + toAdd);
      setMapTitle(prevMapTitles => [...prevMapTitles, ...toAdd])
    });
  }

  const load = (e) => {
    var Dataref = database.ref("users/User:" + user.uid + "/" + mapTitle[e]);
    
    Dataref.on("value", function(objData) {
      let ccData = [];
      let ciData = [];
      objData.forEach(child =>{ //this but older style.
         ccData.push(child.val().CountryColor.color);
         ciData.push(child.val().CountryISO.ISO);
       })
       console.log(mapTitle[e] + " ISO to show " + ciData);
       console.log(mapTitle[e] + " colors to show " + ccData);
       setCountryColorData(ccData);
       setCountryISOData(ciData);

       for (let i = 0; i < features.length; i++) {
          const country = features[i];
          country.properties.color = "green";

          for (let j = 0; j < ciData.length; j++){
            if (country.properties.ISO_A3 === ciData[j]){
              country.properties.color = ccData[j];
            }
          }
          countries.push(country)
      }
      setColoredMap(countries); 
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
        <Home handleLogout={handleLogout} save={save} preload = {preload} load={load}/>
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

