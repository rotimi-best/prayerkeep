import React, { useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import configs from '../configs';
import logo from '../logo.svg';
import { logIn } from '../actions/authAction';
import { openAlert } from '../actions/alertAction';
import alert from '../constants/alert';
import '../styles/Welcome.css';

firebase.initializeApp({
  apiKey: configs.firebase.apiKey,
  authDomain: configs.firebase.authDomain,
});

const Welcome = ({ dispatch }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // TODO: Use the users details here to login
    });
  }, []);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (res) => {
        // This is google or fb
        if (res.additionalUserInfo) {
          const { email, name, id, picture } = res.additionalUserInfo.profile;
          const user = {
            userId: id,
            picture: picture.data ? picture.data.url : picture,
            name,
            email,
            ...res,
          };

          return dispatch(logIn(user));
        }
      }
    }
  };

  return (
    <div className="Welcome">
      <header className="Welcome-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Parchment Notebook</h1>
        <p>Manage your prayer requests in one place and enjoy your prayer time.</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </header>
    </div>
  )
}

export default connect()(Welcome);