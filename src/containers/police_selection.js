import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { guessMafia, fetchPlayers, updateStage } from '../actions';

class PoliceSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderSelection = this.renderSelection.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayers();
    setTimeout(() => { this.onPoliceReveal(); }, 7000);
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
                 <input type="radio" name="police" value={player._id} />
                 <div className="playerAliveName">{player.name}</div>
               </div>
             </div>
           );
         } else {
           return (
             <div className="players_container">
               <div>
                 <input type="radio" name="police" value={player._id} />
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

export default withRouter(connect(mapStateToProps, { guessMafia, fetchPlayers, updateStage })(PoliceSelection));
