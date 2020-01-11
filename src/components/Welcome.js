import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from "react-redux";
import configs from '../configs';
import logo from '../logo.svg';
import { logIn } from '../actions/authAction';
import '../styles/Welcome.css';

const Welcome = ({ dispatch }) => {
  const responseFacebook = (res) => {
    console.log('res', res);
    const { name = '', picture, userID, email = '' } = res;

    dispatch(logIn({
      email,
      name,
      pictureUrl: picture.data.url,
      userId: userID,
    }))
  }

  return (
    <div className="Welcome">
      <header className="Welcome-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Parchment Notebook</h1>
        <p>Manage your prayer requestsss in one place and enjoy your prayer time.</p>
        <FacebookLogin
          appId={configs.FB_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </header>
    </div>
  )
}

export default connect()(Welcome);