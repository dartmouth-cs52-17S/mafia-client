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
    if (!this.props.game.players) {
      return '';
    } else {
      return (
      this.props.game.players.map((player) => {
        return (
          <div className="playerStatusContainer">
            <div className="playerName" key={player.id}>{player.name}</div>
          </div>
        );
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
    players: state.game.players,
  }
);

export default withRouter(connect(mapStateToProps, { fetchGame })(PlayersDisplay));
