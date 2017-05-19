import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signoutUser } from '../actions';

class Nav extends Component {

  constructor(props) {
    super(props);

    // binding
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onSignOutClick(event) {
    event.preventDefault();
    this.props.signoutUser(this.props.history);
  }

  renderEditButton() {
    // console.log(`auth is ${this.props.auth}`);
    if (this.props.auth) {
      return (
        <div className="Nav">
          <NavLink exact to="/"><img src="/images/logo.png" alt="Mafia" /></NavLink>
          <div className="NavUser">
            <NavLink exact to="/profile/:id">{this.props.user.username}</NavLink>
            <button className="SignOutB" onClick={this.onSignOutClick}>Sign Out</button>
          </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderEditButton()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth.authenticated,
    user: state.users.user,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
