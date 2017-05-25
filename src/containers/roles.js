import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';

// import { fetchPlayer } from '../actions';

class Roles extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    // binding
    this.renderRole = this.renderRole.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchPlayer();
  // }

  // renderRole() {
  //   if (!this.props.player) { // this just checks if data has been fetched and mapped to props yet
  //     return '';
  //   } else {
  //     switch (this.props.player.role) {
  //       // 0: mafia, 1: doctor, 3: police, 4-6: village
  //       case 'mafia': return (<div className="roleAssigned">Mafia</div>);
  //       case 'doctor': return (<div className="roleAssigned">Doctor</div>);
  //       case 'police': return (<div className="roleAssigned">Police</div>);
  //       case 'villager': return (<div className="roleAssigned">Villager</div>);
  //       default: return '';
  //     }
  //   }
  // }
  renderRole() {
    if (!localStorage.getItem('role')) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else {
      switch (!localStorage.getItem('role')) {
        // 0: mafia, 1: doctor, 3: police, 4-6: village
        case 'mafia': return (<div className="roleAssigned">Mafia</div>);
        case 'doctor': return (<div className="roleAssigned">Doctor</div>);
        case 'police': return (<div className="roleAssigned">Police</div>);
        case 'villager': return (<div className="roleAssigned">Villager</div>);
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

// const mapStateToProps = state => (
//   {
//     player: state.players.player,
//   }
// );
export default withRouter(connect()(Roles));

// export default withRouter(connect(mapStateToProps, { fetchPlayer })(Roles));
