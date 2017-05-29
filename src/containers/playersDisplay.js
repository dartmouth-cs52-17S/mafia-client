import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';

import { fetchGame } from '../actions';

class PlayersDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    // binding
    this.renderPlayerStatus = this.renderPlayerStatus.bind(this);
  }

  componentDidMount() {
    this.props.fetchGame();
  }

  renderPlayerStatus() {
    // this just checks if data has been fetched and mapped to props yet
    if (!this.props.players) {
      return '';
    } else {
      return (
      this.props.players.map((player) => {
        console.log(JSON.stringify(this.props.players));
        if (player.status === true) {
          return (
            <div className="playerStatusContainer">
              <div className="playerAliveName" key={player.id}>{player.name}</div>
            </div>
          );
        } else {
          return (
            <div className="playerStatusContainer">
              <div className="playerDeadName" key={player.id}>{player.name}</div>
            </div>
          );
        }
      })
      );
    }
  }

  render() {
    return (
      <div className="NarrationContainer">
        <h1>The Village</h1>
        <div className="playersStatusContainer">{this.renderPlayerStatus()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    game: state.game,
    players: state.players.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchGame })(PlayersDisplay));
