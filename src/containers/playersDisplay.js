import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class PlayersDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.renderPlayerStatus = this.renderPlayerStatus.bind(this);
  }

  renderPlayerStatus() {
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
            <div key={player.id} className="playersStatusContainer">
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
          <img src="/images/village.svg" alt="Village" />
          <h1>The Village</h1>
          <div className="playersStatusContainer">
            {this.renderPlayerStatus()}
          </div>
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
