import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { voteKill, killPlayer } from '../actions';
// import { withRouter, NavLink } from 'react-router-dom';


class Voting extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };

    // binding
    this.renderPlayerStatus = this.renderPlayerStatus.bind(this);
    this.onSubmitVote = this.onSubmitVote.bind(this);
    this.onTestClicked = this.onTestClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetch(this.props.game.id);
  }

  onTestClicked(event) {
    this.props.updateStage(this.props.game.id, 3);
  }


  onSubmitVote() {
    const selection = document.querySelector('input[name="vote"]:checked').value;
    console.log(selection);
    this.props.killPlayer(selection);
    this.props.updateStage(this.props.game.id, 3);
  }


  // update players' votes
  // go back to check everyone's vote
  // kill player with most votes


  //   let votesNeeded = 0;
  //   for (this.player in this.props.players) {
  //     if (this.player.status) {
  //       votesNeeded += 1;
  //       return votesNeeded;
  //     }
  //   }
  //
  //   // make sure everyone who is alive has cast a vote
  //   if (selection.length === votesNeeded.length) {
  //     this.props.voteKill(selection);
  //   }
  //   this.props.updateStage(this.props.game.id, 3);
  // }


  renderPlayerStatus() {
    // this just checks if data has been fetched and mapped to props yet
    if (!this.props.players) {
      return '';
    } else {
      return (
      this.props.players.map((player) => {
        if (player.status) {
          return (
            <div className="playerStatusContainer">
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
    return (
      <div>
        <div className="VotingContainer">
          <h1>Voting</h1>
          <div className="playersStatusContainer">{this.renderPlayerStatus()}</div>
          <button onClick={this.onSubmitVote}> Submit </button>
          <button onClick={this.onTestClicked}> Force-next </button>
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

export default withRouter(connect(mapStateToProps, { voteKill, killPlayer })(Voting));
