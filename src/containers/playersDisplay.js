import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';

import { fetchGame, fetchUsers } from '../actions';

class Narration extends Component {

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
          return (
            <div className="playerStatusContainer">
              <div className="playerName">{player.user.name}</div>
              {/* CSS: isAlive and isDead influence image opacity*/}
              if (player.status){
                <img className="isAlive" src={player.user.pic || ''} alt="Player Alive" key={player.user.facebookID} />
              }
              else {
                <img className="isDead" src={player.user.pic || ''} alt="Player Dead" key={player.user.facebookID} />
              }
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
        <div className="palyersStatusContainer">{this.renderPlayerStatus}</div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    players: state.players.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchGame, fetchUsers })(Narration));
