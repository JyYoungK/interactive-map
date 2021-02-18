import React, { useState, useEffect, createContext} from 'react';
import fire from './config/fire'
import "./App.css";
import Login from './Login';
import Home from './Home';
import firebase from 'firebase';


const App = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

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

  function save () {
    console.log("Successfully saved data under " + user.uid);

    var database = firebase.database();
    var usersRef = database.ref("users");
    var userExists = database.ref("users/" + user.uid);

    userExists.once("value")
    .then(function(userinDB){
        if (userinDB.exists()){ //if username exists only create new category, update
            usersRef.child(user.uid).push({
                CountryData: "countryData",
            });
        }
        else{
          usersRef.child(user.uid).push({
            CountryData: "countryData",
          });
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

export default App;
