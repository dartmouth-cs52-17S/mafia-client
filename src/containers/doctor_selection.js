import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPlayers, healPlayer, advanceStage } from '../actions';
import Nav from './nav';

class DoctorSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderSelection = this.renderSelection.bind(this);
    this.onDoctorHeal = this.onDoctorHeal.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayers();
    setTimeout(() => { this.onDoctorHeal(); }, 7000);
  }

  onDoctorHeal() {
    console.log('doctorheal');
    if (localStorage.getItem('role') === 'doctor') {
      console.log(document.querySelector('input[name="doctor"]:checked'));
      console.log(document.querySelector('input[name="doctor"]:checked').value);
      const doctor = document.querySelector('input[name="doctor"]:checked').value;
      this.props.healPlayer(doctor);
    }
    this.props.advanceStage();
  }

  renderSelection() {
    if (!localStorage.getItem('role')) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else if (localStorage.getItem('role') === 'doctor') {
      return (
        this.props.game.players.map((player) => {
          console.log(player);
          if (player.status === true) {
            return (
              <div className="players_container">
                <div>
                  <input type="radio" name="doctor" value={player._id} />
                  <div className="playerAliveName">{player.name}</div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="players_container">
                <div>
                  <input type="radio" name="doctor" value={player._id} />
                  <div className="playerDeadName">{player.name}</div>
                </div>
              </div>
            );
          }
        })
      );
    } else {
      console.log('whatuppppp');
      return (
        <div className="wait">Waiting for the doctor to save someone...
        </div>
      );
    }
  }
  render() {
    console.log('Entered doctor selection');
    return (
      <div>
        <Nav />
        <div className="RolesContainer">
          {this.renderSelection()}
        </div>
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

export default withRouter(connect(mapStateToProps, { fetchPlayers, healPlayer, advanceStage })(DoctorSelection));
