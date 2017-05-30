import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


// import { withRouter, NavLink } from 'react-router-dom';


class PlayersDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    // binding
    this.renderPlayerStatus = this.renderPlayerStatus.bind(this);
  }

  renderPlayerStatus() {
    // this just checks if data has been fetched and mapped to props yet
    if (!this.props.players) {
      return '';
    } else {
      return (
      this.props.players.map((player) => {
        if (player.status) {
          return (
            <div key={player.id} className="playerStatusContainer">
              <div className="playerAliveName">{player.name}</div>
            </div>
          );
        } else {
          return (
            <div key={player.id} className="playerStatusContainer">
              <div className="playerDeadName">{player.name}</div>
            </div>
          );
        }
      })
      );
    }
  }

  render() {
    return (
      <div>
        <div className="stage">
          <h1>The Village</h1>
          <div className="playersStatusContainer">{this.renderPlayerStatus()}</div>
        </div>
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

export default withRouter(connect(mapStateToProps, null)(PlayersDisplay));
