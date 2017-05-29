import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGame, fetchPlayers, killPlayer, advanceStage } from '../actions';

class MafiaSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderSelection = this.renderSelection.bind(this);
    this.onMafiaKill = this.onMafiaKill.bind(this);
    this.onKillClicked = this.onKillClicked.bind(this);
    this.onTestClicked = this.onTestClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayers(this.props.game.id);
  }

  onMafiaKill() {
    if (document.querySelector('input[name="mafia"]:checked')) {
      const mafia = document.querySelector('input[name="mafia"]:checked').value;
      this.props.killPlayer(mafia);
      this.props.advanceStage(this.props.game.id);
      this.props.fetchGame(this.props.game.id);
    } else {
      alert('You are a mafia. You must kill one person. Choose wisely.');
    }
  }

  onKillClicked(event) {
    this.onMafiaKill();
  }

  onTestClicked(event) {
    this.props.advanceStage(this.props.game.id);
  }

  renderSelection() {
    if (!localStorage.getItem('role')) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else if (localStorage.getItem('role') === 'mafia') {
      return (
       this.props.players.map((player) => {
         if (player.status) {
           return (
             <div className="players_container">
               <div>
                 <input type="radio" name="mafia" value={player.id} />
                 <div className="playerAliveName">{player.name}</div>
               </div>
             </div>
           );
         } else {
           return (
             <div className="players_container">
               <div>
                 <div className="playerDeadName">{player.name}</div>
               </div>
             </div>
           );
         }
       })
      );
    } else {
      return (
        <div className="wait">Waiting 4 mafia 2 kill sum1...
        </div>
      );
    }
  }

  render() {
    console.log('Entered mafia selection');
    if (localStorage.getItem('role') === 'mafia') {
      return (
        <div>
          <div> {this.renderSelection()} </div>
          <button onClick={this.onKillClicked}> Next </button>
        </div>
      );
    } else {
      return (
        <div>
          <div> {this.renderSelection()} </div>
          <button onClick={this.onTestClicked}> Force-next </button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    players: state.players.all,
    game: state.game,
  }
);

export default withRouter(connect(mapStateToProps, { fetchGame, fetchPlayers, killPlayer, advanceStage })(MafiaSelection));
