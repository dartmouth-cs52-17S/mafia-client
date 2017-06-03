import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signoutUser } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signoutUser(this.props.history);
  }

  render() {
    if (this.props.auth) {
      return (
        <nav>
          <Link to="/">
            <img className="logo-top-left" src="/images/fedora-hat.svg" alt="Mafia" />
          </Link>
          <form onSubmit={this.handleSubmit}>
            <button id="signoutbutt" to="/signout">Sign Out</button>
          </form>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to="/">
            <img className="logo-top-left" src="/images/fedora-hat.svg" alt="Mafia" />
          </Link>
        </nav>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth.authenticated,
    user: state.users.user,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
