import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { killPlayer } from '../actions';

class Selection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onSelect = this.onSelect.bind(this);
  }

  onKillClick(event) {
    this.props.killPlayer(event.target.key);
  }

  renderSelection() {
    if (!localStorage.getItem('role')) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else if (localStorage.getItem('role') === 'mafia') {
      return (
       this.props.players.map((player) => {
         return (
           <div className="players_container">
             <div className="playerName">{player.user.name}</div>
             <button key={player._id} onClick={this.onKillClick}> {player.user} </button>
           </div>
         );
       })
      );
    } else {
      return <div className="wait">Waiting Mafia to Kill</div>;
    }
  }

  render() {
    return <div>{this.renderSelection()}</div>;
  }

}


const mapStateToProps = state => (
  {
    players: state.game.players,
  }
);

export default withRouter(connect(mapStateToProps, { killPlayer })(Selection));
