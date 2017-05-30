import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { voteKill } from '../actions';
// import { withRouter, NavLink } from 'react-router-dom';


class Voting extends Component {

  constructor(props) {
    super(props);

    this.state = { clicked: false };

    // binding
    this.renderPlayerStatus = this.renderPlayerStatus.bind(this);
    this.onSubmitVote = this.onSubmitVote.bind(this);
    this.onTestClicked = this.onTestClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetch(this.props.game.id);
  }

  onTestClicked(event) {
    this.props.updateStage(this.props.game.id, 9);
  }

  onSubmitVote() {
    const selection = document.querySelector('input[name="vote"]:checked').value;
    this.props.voteKill(selection);
    this.setState({ clicked: true });
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
            <div className="option">
              <input type="radio" name="vote" value={player.id} />
              <div className="playerAliveName" key={player.id}>{player.name}</div>
            </div>
          );
        } else {
          console.log(player.status);
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
    if (!this.state.clicked) {
      return (
        <div>
          <div className="VotingContainer">
            <h1>Voting: Who do you think is the mafia?</h1>
            <div className="playersStatusContainer">{this.renderPlayerStatus()}</div>
            <button onClick={this.onSubmitVote}> Submit </button>
            <button onClick={this.onTestClicked}> Force-next </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="VotingContainer">
            <h1>Voting</h1>
            <div className="playersStatusContainer">{this.renderPlayerStatus()}</div>
            <button onClick={this.onTestClicked}> Force-next </button>
          </div>
          <div className="AfterVote">
            <h3>Vote counted! Waiting for other players to vote...</h3>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    game: state.game,
    players: state.players.all,
  }
);

export default withRouter(connect(mapStateToProps, { voteKill })(Voting));
