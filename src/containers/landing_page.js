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

  sendToken(authResponse) {
    localStorage.setItem('fbid', authResponse.userID);
    this.props.authUser(authResponse, this.props.history);
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.sendToken(response.authResponse);
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
  }

  checkLoginState() {
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }

  handleClick() {
    FB.login(this.checkLoginState());
  }

  render() {
    if (this.props.auth) {
      return (
        <div className="landing-page-container">
          <div className="landing-page-upper">
            <img src="/images/Logo.svg" alt="Mafia" />
          </div>
          <div>
            <Link to="/home">
              <button className="signin">
                <span className="signin-text">Start Game</span>
              </button>
            </Link>
          </div>
          <p id="status" />
        </div>
      );
    } else {
      return (
        <div className="landing-page-container">
          <div className="landing-page-upper">
            <img src="/images/Logo.svg" alt="Mafia" />
          </div>
          <div>
            <button className="signin" onClick={this.handleClick}>
              <span className="signin-text">
                Log in with <i className="fa fa-facebook-official" aria-hidden="true" />
              </span>
            </button>
          </div>
          <p id="status" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { authUser })(LandingPage));
