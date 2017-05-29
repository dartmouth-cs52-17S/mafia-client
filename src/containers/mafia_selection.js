import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPlayers, killPlayer, advanceStage } from '../actions';

class MafiaSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderSelection = this.renderSelection.bind(this);
    this.onMafiaKill = this.onMafiaKill.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayers();
    setTimeout(() => { this.onMafiaKill(); }, 7000);
  }

  onMafiaKill() {
    if (localStorage.getItem('role') === 'mafia') {
      console.log(document.querySelector('input[name="mafia"]:checked'));
      console.log(document.querySelector('input[name="mafia"]:checked').value);
      const mafia = document.querySelector('input[name="mafia"]:checked').value;
      this.props.killPlayer(mafia);
    }
    this.props.advanceStage();
  }

  onKillClicked(event) {
    const playerIds = this.props.game.players.map((player) => { return player._id; });
    this.props.createPlayers(this.props.game.id, playerIds);
    this.props.advanceStage();
    console.log(this.props.game.stage);
  }

  renderSelection() {
    console.log(localStorage.getItem('role'));
    if (!localStorage.getItem('role')) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else if (localStorage.getItem('role') === 'mafia') {
      return (
       this.props.game.players.map((player) => {
         if (player.status === true) {
           return (
             <div className="players_container">
               <div>
                 <input type="radio" name="mafia" value={player._id} />
                 <div className="playerAliveName">{player.name}</div>
               </div>
             </div>
           );
         } else {
           return (
             <div className="players_container">
               <div>
                 <input type="radio" name="mafia" value={player._id} id="player" />
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
    return (
      <div>
        {this.renderSelection()}
      </div>
    );
  }
}


const mapStateToProps = state => (
  {
    players: state.players.all,
    game: state.game,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPlayers, killPlayer, advanceStage })(MafiaSelection));
