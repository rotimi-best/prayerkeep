import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
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
  apiKey: "AIzaSyCx84H9bUx3cYdWsqChu6C50O_fLHbI038",
  authDomain: "parchment-notebook.firebaseapp.com"
});

const Welcome = ({ dispatch }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // TODO: Use the users details here to login
      // this.setState({ isSignedIn: !!user })
      //console.log("user", user)
      // if (!!user) {
      //   dispatch(openAlert(`Welcome in.`, alert.SUCCESS));
      // }
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
        // This is google
        if (res.additionalUserInfo) {
          const { email, name, id, picture } = res.additionalUserInfo.profile;
          const user = {
            userId: id,
            picture,
            name,
            email,
            ...res,
          };

          return dispatch(logIn(user));
        }
      }
    }
  };
  const responseFacebook = fbData => {
    Object.defineProperty(fbData, 'userId', Object.getOwnPropertyDescriptor(fbData, 'userID'));
    delete fbData.userID;
    dispatch(logIn(fbData));
  }

  const handleFailure = response => {
    const msg = JSON.stringify(response) || 'EMPTY';
    dispatch(openAlert(`Failed to login ${msg}`, alert.ERROR));
  }

  return (
    <div className="Welcome">
      <header className="Welcome-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Parchment Notebook</h1>
        <p>Manage your prayer requests in one place and enjoy your prayer time.</p>
        {/*// <FacebookLogin
        //   appId={configs.FB_APP_ID}
        //   autoLoad={false}
        //   fields="name,email,picture"
        //   callback={responseFacebook}
        //   onFailure={handleFailure}
        //   // redirectUri="https://parchmentnotebook.netlify.com"
        //   disableMobileRedirect={true}
         />*/}
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </header>
    </div>
  )
}

export default connect()(Welcome);