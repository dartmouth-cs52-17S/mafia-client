import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { doctorChoose } from '../actions';


class DoctorSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderSelection = this.renderSelection.bind(this);
    this.onDoctorHeal = this.onDoctorHeal.bind(this);
    this.onHealClicked = this.onHealClicked.bind(this);
    this.onTestClicked = this.onTestClicked.bind(this);
  }

  onDoctorHeal() {
    if (document.querySelector('input[name="doctor"]:checked')) {
      const doctor = document.querySelector('input[name="doctor"]:checked').value;
      this.props.doctorChoose(this.props.game.id, doctor);
      this.props.updateStage(this.props.game.id, 7);
    } else {
      alert('Doctor must heal one person.');
    }
  }

  onHealClicked(event) {
    this.onDoctorHeal();
  }

  onTestClicked(event) {
    this.props.updateStage(this.props.game.id, 7);
  }

  renderSelection() {
    if (!localStorage.getItem('role')) {
      return '';
    } else if (localStorage.getItem('role') === 'doctor') {
      return (
        this.props.players.map((player) => {
          if (player.status) {
            return (
              <div className="players_container">
                <div className="option">
                  <input type="radio" name="doctor" value={player.id} />
                  <div className="playerAliveName">{player.name}</div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="players_container">
                <div className="option">
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
            Waiting for the doctor to heal<span>.</span><span>.</span><span>.</span>
          </div>
          <img src="/images/heal.svg" alt="heal" />
        </div>
      );
    }
  }


  render() {
    if (localStorage.getItem('role') === 'doctor') {
      return (
        <div>
          {this.renderSelection()}
          <button onClick={this.onHealClicked}> Next </button>
        </div>

      );
    } else {
      return (
        <div>
          {this.renderSelection()}
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

export default withRouter(connect(mapStateToProps, { doctorChoose })(DoctorSelection));
