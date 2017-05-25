import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { createGame, createPlayers, updatePlayers, addUserToGame, fetchGame, advanceStage, ROOT_URL } from '../actions';
import Chat from './chat';
import { socketserver } from './app';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(socketserver);

    this.usersInLobby = [];

    this.socket.on('connect', () => {
      if (window.location.pathname === '/lobby' || window.location.pathname === '/lobby/') {
        this.props.createGame(localStorage.getItem('token'), this.props.history);
      } else {
        this.props.updatePlayers(localStorage.getItem('token'), this.props.match.params.gameID);
        // lol that thing above is a massive hack. I should be using match.params.id but it didn't work so...
      }
      setTimeout(() => this.props.fetchGame(this.props.match.params.gameID), 1000);
    });

    this.renderPlayers = this.renderPlayers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderSubmitButton = this.renderSubmitButton.bind(this);
  }

  // renderRoles() {
  //   return (
  //     <div className="RolesContainer">
  //       <h2>You Are</h2>
  //       {this.props.player.role}
  //     </div>
  //   );
  // }

  // renderChat() {
  //
  // }

  // render() {
  //   return (
  //     <div className-"GameContainer">
  //       <div className="Roles">{this.renderRoles}</div>
  //       <div className="Roles">{}</div>
  //       // <div className="Selection">{this.renderselection}</div>  // all the pop ups
  //       // <div className="Chat">{this.renderChat}</div>
  //     </div>
  //   );
  // }

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

  onSubmit(event) {
    this.props.createPlayers(this.props.game, this.props.game.players);
    advanceStage();
    console.log(this.props.game.stage);
  }

  renderPlayers() {
    return this.props.game.players.map((name) => {
      return (<li>{name}</li>);
    });
  }

  renderSubmitButton() {
    if (this.props.game.players.length >= 1) {
      return (<button onClick={this.onSubmit}>Play</button>);
    } else {
      return (<div />);
    }
  }

  render() {
//     switch (this.props.game.stage) {
//       case 0:
//         return (
//           <div>
//             <h3>Players Connected:</h3>
//             <ul>
//               {this.renderPlayers()}
//             </ul>
//             <button onClick={this.onSubmit}>Start Game</button>
//           </div>
//         );
//       case 1:
//         return (
//           <div>
//             Hurray!
//             {Selection}
//           </div>
//         );
//       default: return '';
//     }


    return (
      <div>
        <h3>Players Connected:</h3>
        <ul>
          {this.renderPlayers()}
        </ul>
        {this.renderSubmitButton()}
        <div>
          <Chat />
        </div>
      </div>

    );
  }
}


const mapStateToProps = state => ({
  game: state.game,
  users: state.users,
}
);

export default withRouter(connect(mapStateToProps, { createPlayers, createGame, updatePlayers, addUserToGame, fetchGame, advanceStage })(Lobby));
