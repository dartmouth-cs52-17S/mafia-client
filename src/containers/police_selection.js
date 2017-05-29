import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Nav from './nav';
import { guessMafia, fetchGame, fetchPlayers, updateStage, advanceStage } from '../actions';

class PoliceSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderSelection = this.renderSelection.bind(this);
    this.onPoliceReveal = this.onPoliceReveal.bind(this);
    this.onRevealClicked = this.onRevealClicked.bind(this);
    this.onTestClicked = this.onTestClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayers(this.props.game.id);
  }

  onPoliceReveal() {
    if (localStorage.getItem('role') === 'police') {
      console.log(document.querySelector('input[name="police"]:checked'));
      console.log(document.querySelector('input[name="police"]:checked').value);
      const police = document.querySelector('input[name="police"]:checked').value;
      this.props.guessMafia(police);
    }
    this.props.updateStage(this.props.game.id, 3);
    this.props.fetchGame(this.props.game.id);
  }

  onRevealClicked() {
    this.onPoliceReveal();
  }

  onTestClicked(event) {
    this.props.updateStage(3);
  }

  renderSelection() {
    if (!localStorage.getItem('role')) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else if (localStorage.getItem('role') === 'police') {
      return (
       this.props.players.map((player) => {
         if (player.status) {
           return (
             <div className="players_container">
               <div>
                 <input type="radio" name="police" value={player.id} />
                 <div className="playerAliveName">{player.name}</div>
               </div>
             </div>
           );
         } else {
           return (
             <div className="players_container">
               <div>
                 <input type="radio" name="police" value={player.id} />
                 <div className="playerDeadName">{player.name}</div>
               </div>
             </div>
           );
         }
       })
      );
    } else {
      return (
        <div className="wait">Waiting 4 da cop to inquire... mafia, you betta watch yo back
        </div>
      );
    }
  }


  render() {
    console.log('Entered police selection');
    if (localStorage.getItem('role') === 'police') {
      return (
        <div>
          <Nav />
          <div>
            <div> {this.renderSelection()} </div>
            <button onClick={this.onRevealClicked}> Next </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Nav />
          <div>
            <div> {this.renderSelection()} </div>
            <button onClick={this.onTestClicked}> Force-next </button>
          </div>
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

export default withRouter(connect(mapStateToProps, { guessMafia, fetchGame, fetchPlayers, updateStage, advanceStage })(PoliceSelection));
