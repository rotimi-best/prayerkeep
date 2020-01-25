import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from "react-redux";
import configs from '../configs';
import logo from '../logo.svg';
import { logIn } from '../actions/authAction';
import '../styles/Welcome.css';

const Welcome = ({ dispatch }) => {
  const responseFacebook = fbData => {
    Object.defineProperty(fbData, 'userId', Object.getOwnPropertyDescriptor(fbData, 'userID'));
    delete fbData.userID;
    dispatch(logIn(fbData));
  }

  return (
    <div className="Welcome">
      <header className="Welcome-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Parchment Notebook</h1>
        <p>Manage your prayer requests in one place and enjoy your prayer time.</p>
        <FacebookLogin
          appId={configs.FB_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          redirectUri="https://parchmentnotebook.netlify.com"
        />
      </header>
    </div>
  )
}

export default connect()(Welcome);