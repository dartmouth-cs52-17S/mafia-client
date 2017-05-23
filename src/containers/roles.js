import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';

import { fetchProfile, fetchGame } from '../actions';

class Roles extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    // binding
    this.renderRole = this.renderRole.bind(this);
  }

  componentDidMount() {
    this.props.fetchGame();
    this.props.fetchProfile();
  }

  renderRole() {
    if (!this.props.players) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else {
      switch (this.props.players.indexOf(this.props.user.id)) {
        // 0: mafia, 1: doctor, 3: police, 4-6: village
        case 0: return (<div className="roleAssigned">Mafia</div>);
        case 1: return (<div className="roleAssigned">Doctor</div>);
        case 2: return (<div className="roleAssigned">Police</div>);
        case 3: return (<div className="roleAssigned">Villager</div>);
        case 4: return (<div className="roleAssigned">Villager</div>);
        case 5: return (<div className="roleAssigned">Villager</div>);
        default: return '';
      }
    }
  }

  render() {
    return (
      <div className="RolesContainer">
        <h2>You Are</h2>
        {this.renderRole}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    players: state.game.players,
    user: state.users.user,
  }
);

export default withRouter(connect(mapStateToProps, { fetchProfile, fetchGame })(Roles));
