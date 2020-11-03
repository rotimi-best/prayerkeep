import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import configs from '../configs';
import logo from '../logo.svg';
import { logIn } from '../actions/authAction';
import '../styles/Welcome.css';

firebase.initializeApp({
  apiKey: configs.firebase.apiKey,
  authDomain: configs.firebase.authDomain,
});

const Welcome = ({ dispatch }) => {
  const [onSignInSuccess, setOnSignInSuccess] = React.useState(false);
  const history = useHistory();
  const { isLoggedIn } = useSelector(state => ({
    isLoggedIn: state.authentication.isLoggedIn
  }));

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/')
    }
    firebase.auth().onAuthStateChanged(user => {
      // TODO: Use the users details here to login
      const localUser = JSON.parse(localStorage.getItem('user')) || null;
      if (!!user && !localUser) {
          //console.log("nothing stored in local storage")
          // return dispatch(logIn({
          //   userId: id,
          //   picture: picture.data ? picture.data.url : picture,
          //   name,
          //   email,
          //   ...user,
          // }));
      }
    });
  }, [isLoggedIn, history]);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: '',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (res) => {
        setOnSignInSuccess(true)
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
        <h1>Prayer Keep</h1>
        <p>Manage your prayer requests in one place and enjoy your prayer time.</p>
        {!onSignInSuccess && <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />}
      </header>
    </div>
  )
}

export default connect()(Welcome);