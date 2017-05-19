import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
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
      <div className="container">
        <div className="signin-form">
          <div>
            <input placeholder="username" onChange={this.onUsernameChange} value={this.state.username} />
          </div>
          <div>
            <input placeholder="password" onChange={this.onPasswordChange} value={this.state.password} />
          </div>
        </div>
        <div id="buttons">
          <button onClick={this.onSubmit}>Submit</button>
          <NavLink to="/"><button>Cancel</button></NavLink>
        </div>
      </div>

    );
  }
}


export default withRouter(connect(null, { signinUser })(SignIn));
