import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
      <div className="container">
        <div className="inputForm">
          <p>Sign Up:</p>
          <input className="black-box" onChange={this.onUsernameChange} placeholder="Enter a username" />
          <button className="done" onClick={this.onSubmitClicked}>Sign Up!</button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
