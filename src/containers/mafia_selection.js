import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { killPlayer } from '../actions';

class MafiaSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderSelection = this.renderSelection.bind(this);
    this.onMafiaKill = this.onMafiaKill.bind(this);
    this.onKillClicked = this.onKillClicked.bind(this);
    this.onTestClicked = this.onTestClicked.bind(this);
  }

  onKillClicked(event) {
    this.onMafiaKill();
  }

  onMafiaKill() {
    if (localStorage.getItem('role') === 'mafia') {
      const mafia = document.querySelector('input[name="mafia"]:checked').value;
      this.props.killPlayer(mafia);
    }
    this.props.updateStage(this.props.game.id, 5);
  }

  onTestClicked(event) {
    this.props.updateStage(this.props.game.id, 5);
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
                 <input type="radio" name="mafia" value={player.id} id="player" />
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
          <div>
            <div> {this.renderSelection()} </div>
            <button onClick={this.onKillClicked}> Next </button>
          </div>
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

export default withRouter(connect(mapStateToProps, { killPlayer })(MafiaSelection));
