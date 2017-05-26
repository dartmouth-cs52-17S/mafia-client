import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { createGame, createPlayers, updatePlayers, addUserToGame, fetchGame, advanceStage, ROOT_URL } from '../actions';
import Chat from './chat';
import { socketserver } from './app';
import Roles from './roles';
import Players from './playersDisplay';
import DoctorSelect from './doctor_selection';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(socketserver);

    this.usersInLobby = [];

    this.socket.on('connect', () => {
      if (window.location.pathname === '/lobby' || window.location.pathname === '/lobby/') {
        this.props.createGame(localStorage.getItem('token'), this.props.history)
        .then(this.props.updatePlayers(localStorage.getItem('token'), this.props.match.params.gameID));
      } else {
        this.props.updatePlayers(localStorage.getItem('token'), this.props.match.params.gameID);
      }
      this.setState({});
      setTimeout(() => this.props.fetchGame(this.props.match.params.gameID), 1000);
    });

    this.renderPlayers = this.renderPlayers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderSubmitButton = this.renderSubmitButton.bind(this);
    this.renderStage0 = this.renderStage0.bind(this);
    this.renderStage1 = this.renderStage1.bind(this);
    this.renderStage2 = this.renderStage2.bind(this);
    this.renderStage3 = this.renderStage3.bind(this);
    this.renderStage4 = this.renderStage4.bind(this);
    this.renderStages = this.renderStages.bind(this);
    this.refetchGame = this.refetchGame.bind(this);
  }

  componentWillUpdate() {
    if (this.props.game.players.length > 0) {
      for (let index = 0; index < this.props.game.players.length; index += 1) {
        axios.get(`${ROOT_URL}/user/${this.props.game.players[index]}`).then((response) => {
          this.usersInLobby = this.usersInLobby.concat([response.data.name]);
          console.log(this.usersInLobby);
        });
      }
    }
  }

  // Switch Stages
  onSubmit(event) {
    this.props.createPlayers(this.props.game, this.props.game.players);
    advanceStage();
    console.log(this.props.game.stage);
  }

  refetchGame() {
    this.props.fetchGame(this.props.match.params.gameID);
  }

  renderSubmitButton() {
    if (this.props.game.players.length >= 1) {
      return (<button onClick={this.onSubmit} id="render-butt">Play</button>);
    } else {
      return (<div />);
    }
  }

  // Stage 0:
  renderPlayers() {
    console.log(this.props.game);
    return this.props.game.players.map((player) => {
      return (<li key={player.id}>{player.name}</li>);
    });
  }

  renderStage0() {
    return (
      <div>
        <h3>Players Connected:</h3>
        <ul>
          {this.renderPlayers()}
        </ul>
      </div>
    );
  }

  // Stage 1:
  renderStage1() {
    return (
      <div>
        <h3>Assigning Roles</h3>
        <div>{this.props.assignRoles}</div>
      </div>
    );
  }

  // Stage 2: Dislay Assigned Roles
  renderStage2() {
    return (
      <div>
        <h3>Display Roles</h3>
        <Roles />
      </div>
    );
  }

  // Stage 3:Display all players
  renderStage3() {
    return (
      <div>
        <h3>Display Players</h3>
        <Players />
      </div>
    );
  }

  // Stage 4: Doctor Heal
  renderStage4() {
    return (
      <div>
        <h3>Display Players</h3>
        <DoctorSelect />
      </div>
    );
  }

  renderStages() {
    switch (this.props.game.stage) {
      case 0:
        return <div>{this.renderStage0()}</div>;
      case 1:
        return <div>{this.renderStage1()}</div>;
      case 2:
        return <div>{this.renderStage2()}</div>;
      default: return '';
    }
  }

  render() {
    if (!this.props.game) {
      return <div>Loading</div>;
    } else {
      return (
        <div className="lobby-container">
          <div className="StagesDisplay">
            <h1>Stage: {this.props.game.stage}</h1>
            {this.renderStages()}
            {this.renderSubmitButton()}
          </div>
          <div className="chat-section">
            <Chat reload={this.refetchGame} />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  game: state.game,
  users: state.users,
}
);

export default withRouter(connect(mapStateToProps, { createPlayers, createGame, updatePlayers, addUserToGame, fetchGame, advanceStage })(Lobby));
