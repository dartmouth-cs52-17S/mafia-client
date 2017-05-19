import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.signinUser(this.state, this.props.history);
  }

  render() {
    return (
      <div className="signin_container">
        <div>
          <input placeholder="username" className="signin_input" onChange={this.onUsernameChange} value={this.state.username} />
        </div>
        <div>
          <input placeholder="password" className="signin_input" onChange={this.onPasswordChange} value={this.state.password} />
        </div>
        <div className="signin_done">
          <div id="buttons">
            <button className="signin_button" onClick={this.onSubmit}>Submit</button>
            <NavLink to="/"><button className="signin_button">Cancel</button></NavLink>
          </div>
          <div className="signup_link">
            <span>Wanna </span>
            <Link to="/signup" className="signup_text">Sign Up</Link>
            <span>?</span>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(connect(null, { signinUser })(SignIn));
