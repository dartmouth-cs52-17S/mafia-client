import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onSubmitClicked = this.onSubmitClicked.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onSubmitClicked(event) {
    this.props.signupUser(this.state.username, this.props.history);
  }

  render() {
    return (
      <div className="signup_container">
        <div>
          <input className="signup_input" onChange={this.onUsernameChange} placeholder="Enter a username" />
        </div>
        <div className="signup_done">
          <button className="signup_button" onClick={this.onSubmitClicked}>Sign Up</button>
          <NavLink to="/"><button className="signup_button">Cancel</button></NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
