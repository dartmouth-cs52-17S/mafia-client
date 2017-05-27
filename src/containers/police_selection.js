import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { guessMafia } from '../actions';

class PoliceSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onGuessClick = this.onGuessClick.bind(this);
    this.renderSelection = this.renderSelection.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayers();
  }

  onGuessClick(event) {
    this.props.guessMafia(event.target.key);
  }

  renderSelection() {
    if (!localStorage.getItem('role')) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else if (localStorage.getItem('role') === 'police') {
      return (
       this.props.game.players.map((player) => {
         return (
           <div className="players_container">
             <div className="playerName">{player.name}</div>
             <button key={player._id} onClick={this.onGuessClick}> {player.name} </button>
           </div>
         );
       })
      );
    } else {
      return <div className="wait">Waiting 4 da cop to inquire... mafia, you betta watch yo back</div>;
    }
  }

  render() {
    return <div>{this.renderSelection()}</div>;
  }

}


const mapStateToProps = state => (
  {
    players: state.game.players,
    game: state.game,
  }
);

export default withRouter(connect(mapStateToProps, { guessMafia })(PoliceSelection));
