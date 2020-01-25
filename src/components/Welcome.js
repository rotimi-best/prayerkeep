import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from "react-redux";
import configs from '../configs';
import logo from '../logo.svg';
import { logIn } from '../actions/authAction';
import { openAlert } from '../actions/alertAction';
import alert from '../constants/alert';
import '../styles/Welcome.css';

const Welcome = ({ dispatch }) => {
  const responseFacebook = fbData => {
    dispatch(openAlert(`Sucessfully loggedin`, alert.SUCCESS));
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
        <FacebookLogin
          appId={configs.FB_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          onFailure={handleFailure}
          // redirectUri="https://parchmentnotebook.netlify.com"
          disableMobileRedirect={true}
        />
      </header>
    </div>
  )
}

export default connect()(Welcome);