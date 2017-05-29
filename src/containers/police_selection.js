import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { guessMafia } from '../actions';

class PoliceSelection extends Component {
  constructor(props) {
    super(props);

    this.state = { clicked: false };
    this.onRevealClicked = this.onRevealClicked.bind(this);
    this.onTestClicked = this.onTestClicked.bind(this);
    this.onNextClicked = this.onNextClicked.bind(this);
  }

  onRevealClicked(event) {
    if (document.querySelector('input[name="police"]:checked')) {
      const police = document.querySelector('input[name="police"]:checked').value;
      this.props.guessMafia(police);
      this.setState({ clicked: true });
    } else {
      alert('Police must reveal one person.');
    }
  }

  onNextClicked(event) {
    this.props.updateStage(this.props.game.id, 7);
  }

  onTestClicked(event) {
    this.props.updateStage(this.props.game.id, 7);
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

  renderReveal() {
    if (localStorage.getItem('correctGuess') === 'true') {
      return (
        <div> You have caught the mafia. </div>
      );
    } else {
      return (
        <div> You have caught an innocent villager. </div>
      );
    }
  }


  render() {
    if (localStorage.getItem('role') === 'police') {
      if (this.state.clicked) {
        return (
          <div>
            <div> {this.renderSelection()} </div>
            <div> {this.renderReveal()}</div>
            <button onClick={this.onNextClicked}> Next </button>
          </div>
        );
      } else {
        return (
          <div>
            <div> {this.renderSelection()} </div>
            <button onClick={this.onRevealClicked}> Reveal </button>
          </div>
        );
      }
    } else {
      return (
        <div>
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

export default withRouter(connect(mapStateToProps, { guessMafia })(PoliceSelection));
