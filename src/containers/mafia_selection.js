import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { killPlayer, mafiaChoose, updateStage } from '../actions';

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
    if (document.querySelector('input[name="mafia"]:checked')) {
      const mafia = document.querySelector('input[name="mafia"]:checked').value;
      this.props.mafiaChoose(this.props.game.id, mafia);
      this.props.updateStage(this.props.game.id, 6);
    } else {
      alert('Mafia must kill one person.');
    }
  }

  onTestClicked(event) {
    this.props.updateStage(this.props.game.id, 6);
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
        <div className="waiting-container">
          <div className="waiting">
          Waiting for Mafia to kill<span>.</span><span>.</span><span>.</span>
          </div>
          <img src="/images/kill.svg" alt="kill" />
        </div>
      );
    }
  }

  render() {
    console.log('Entered mafia selection');
    if (localStorage.getItem('role') === 'mafia') {
      return (
        <div className="stage">
          <div className="stage"> {this.renderSelection()} </div>
          <button onClick={this.onKillClicked}> Next </button>
        </div>
      );
    } else {
      return (
        <div className="stage">
          <div className="stage"> {this.renderSelection()} </div>
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

export default withRouter(connect(mapStateToProps, { killPlayer, mafiaChoose, updateStage })(MafiaSelection));
