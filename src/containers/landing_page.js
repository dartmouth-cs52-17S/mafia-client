import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { authUser } from '../actions';

const FB = window.FB;

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
  //   window.fbAsyncInit = () => {
  //     FB.init({
  //       appId: '1073312029468737',
  //       cookie: true,  // enable cookies to allow the server to access
  //                       // the session
  //       xfbml: true,  // parse social plugins on this page
  //       version: 'v2.1', // use version 2.1
  //     });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    //   FB.getLoginStatus((response) => {
    //     this.statusChangeCallback(response);
    //   });
    // };
    // // Load the SDK asynchronously
    // (function (d, s, id) {
    //   let js = d.getElementsByTagName(s)[0];
    //   const fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = '//connect.facebook.net/en_US/sdk.js';
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
  // }

  sendToken(authResponse) {
    localStorage.setItem('fbid', authResponse.userID);
    this.props.authUser(authResponse.accessToken, this.props.history);
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log('statusChangeCallback');
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
    if (response.status === 'connected') {
    // Logged into your app and Facebook.
      this.sendToken(response.authResponse);
    } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
  checkLoginState() {
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

  handleClick() {
    FB.login(this.checkLoginState());
  }

  render() {
    return (
      <div className="landing-page-container">
        <div className="landing-page-upper">
          <img src="/images/Logo.svg" alt="Mafia" />
        </div>
        <button className="signin" onClick={this.handleClick}>
          <span className="signin-text">Log in with Facebook</span>
        </button>
        <Link to="/home"><button>Enter</button></Link>
        <p id="status" />
      </div>
    );
  }
}

export default withRouter(connect(null, { authUser })(LandingPage));
