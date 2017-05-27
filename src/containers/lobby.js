import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { createGame, createPlayers, updatePlayers, fetchPlayers, getPlayers, addUserToGame, fetchGame, advanceStage, ROOT_URL } from '../actions';
import Chat from './chat';
import { socketserver } from './app';
import Players from './playersDisplay';
import DoctorSelect from './doctor_selection';
import MafiaSelect from './mafia_selection';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(socketserver);

    this.usersInLobby = [];

    this.socket.on('connect', () => {
      if (window.location.pathname === '/lobby' || window.location.pathname === '/lobby/') {
        this.props.createGame(localStorage.getItem('token'), this.props.history)
        .then(this.props.getPlayers(localStorage.getItem('token'), this.props.match.params.gameID));
      } else {
        this.props.getPlayers(localStorage.getItem('token'), this.props.match.params.gameID);
      }
      this.setState({});
      setTimeout(() => this.props.fetchGame(this.props.match.params.gameID), 1000);
    });

    this.renderPlayers = this.renderPlayers.bind(this);
    this.onPlayClicked = this.onPlayClicked.bind(this);
    this.renderPlayButton = this.renderPlayButton.bind(this);
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
  onPlayClicked(event) {
    const playerIds = this.props.game.players.map((player) => { return player._id; });
    this.props.createPlayers(this.props.game.id, playerIds);
    this.props.advanceStage();
    console.log(this.props.game.stage);
  }

  refetchGame() {
    this.props.fetchGame(this.props.match.params.gameID);
  }

  renderPlayButton() {
    if (this.props.game.players.length >= 1) {
      return (<button onClick={this.onPlayClicked} id="render-butt">Play</button>);
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

  renderRole() {
    switch (localStorage.getItem('role')) {
      // 0: mafia, 1: doctor, 3: police, 4-6: village
      case 'mafia': return (<div className="roleAssigned">Mafia</div>);
      case 'doctor': return (<div className="roleAssigned">Doctor</div>);
      case 'police': return (<div className="roleAssigned">Police</div>);
      case 'villager': return (<div className="roleAssigned">Villager</div>);
      default: return 'none. Why don\'t you have role? It\'s probably Adam\'s fault.';
    }
  }

  renderStage0() {
    return (
      <div>
        <h3>Players Connected:</h3>
        <ul>
          {this.renderPlayers()}
          {this.renderPlayButton()}
        </ul>
      </div>
    );
  }

  // Stage 1:
  renderStage1() {
    return (
      <div>
        <h3>Assigning Roles...</h3>
        <div>
          <div className="spinny-loady" />
        </div>
        <div className="reactComment">{setTimeout(() => {
          this.props.fetchPlayers(this.props.game.id);
          this.props.advanceStage();
        }, 3000)}
        </div>
      </div>
    );
  }

  // Stage 2: Dislay Assigned Roles
  renderStage2() {
    return (
      <div>
        <h3>Roles have been assigned!</h3>
        <h2>Your role is:</h2>
        <div>{this.renderRole()}</div>
        <div>{this.renderPlayButton()}</div>
      </div>
    );
  }

  // Stage 3:Display all players
  renderStage3() {
    return (
      <div>
        <Players />
        <div>{this.renderPlayButton()}</div>
      </div>
    );
  }

  // Stage 4: Doctor Heal
  renderStage4() {
    return (
      <div>
        <MafiaSelect />
        <div>{this.renderPlayButton()}</div>
      </div>
    );
  }

  // Stage 4: Doctor Heal
  renderStage5() {
    return (
      <div>
        <DoctorSelect />
        <div>{this.renderPlayButton()}</div>
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
      case 3:
        return <div>{this.renderStage3()}</div>;
      case 4:
        return <div>{this.renderStage4()}</div>;
      case 5:
        return <div>{this.renderStage5()}</div>;
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
});


export default withRouter(connect(mapStateToProps, { createPlayers, createGame, updatePlayers, fetchPlayers, getPlayers, addUserToGame, fetchGame, advanceStage })(Lobby));
