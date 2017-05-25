import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { createGame, updatePlayers, addUserToGame, fetchGame, advanceStage, ROOT_URL } from '../actions';
import { socketserver } from './app';
import Roles from './roles';
import Chat from './chat';


class Lobby extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(socketserver);

    this.usersInLobby = [];

    this.socket.on('connect', () => {
      if (window.location.pathname === '/lobby' || window.location.pathname === '/lobby/') {
        this.props.createGame(localStorage.getItem('token'), this.props.history);
      } else {
        this.props.updatePlayers(localStorage.getItem('token'), window.location.pathname.substring(7));
        // lol that thing above is a massive hack. I should be using match.params.id but it didn't work so...
      }
      setTimeout(() => this.props.fetchGame(window.location.pathname.substring(7)), 1000);
    });

    this.renderPlayers = this.renderPlayers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderSubmitButton = this.renderSubmitButton.bind(this);
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
    event.preventDefault();
    this.props.createPlayers(this.props.game, this.props.game.players);
    advanceStage();
    console.log(this.props.game.stage);
  }

  renderSubmitButton() {
    if (this.usersInLobby.length >= 6) {
      return (<button onSubmit={this.onSubmit}>Play</button>);
    } else {
      return (<div />);
    }
  }

  // Stage 0:
  renderPlayers() {
    console.log(this.usersInLobby);
    return this.props.game.players.map((name) => {
      return (<li>{name}</li>);
    });
  }

  renderStage0() {
    return (
      <div>
        <h3>Players Connected:</h3>
        <ul>
          {this.renderPlayers()}
        </ul>
        <div>
          <Chat />
        </div>
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

  // Stage 2:
  renderStage2() {
    return (
      <div>
        <h3>Display Roles</h3>
        {Roles}
      </div>
    );
  }

  renderStages() {
    switch (this.props.game.currentGameStage) {
      case 0:
        return <div>{this.renderStage0}</div>;
      case 1:
        return <div>{this.renderStage1}</div>;
      case 2:
        return <div>{this.renderStage2}</div>;
      default: return '';
    }
  }

  render() {
    console.log('haha');
    if (!this.props.game.currentGameStage) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <div className="StagesDisplay">
            <h1>{this.props.game.currentGameStage}</h1>
            {this.renderStages}
          </div>
          {this.renderSubmitButton()}
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

export default withRouter(connect(mapStateToProps, { createGame, updatePlayers, addUserToGame, fetchGame, advanceStage })(Lobby));
