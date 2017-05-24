import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { createGame, updatePlayers, addUserToGame, fetchGame, advanceStage, ROOT_URL } from '../actions';
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
        this.props.updatePlayers(localStorage.getItem('token'), window.location.pathname.substring(7));
        // lol that thing above is a massive hack. I should be using match.params.id but it didn't work so...
      }
      this.props.fetchGame(window.location.pathname.substring(7));
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
    event.preventDefault();
    this.props.createPlayers(this.props.game, this.props.game.players);
    advanceStage();
    console.log(this.props.game.stage);
  }

  renderPlayers() {
    console.log(this.usersInLobby);
    return this.props.game.players.map((name) => {
      return (<li>{name}</li>);
    });
  }

  renderSubmitButton() {
    if (this.usersInLobby.length >= 6) {
      return (<button onSubmit={this.onSubmit}>Play</button>);
    } else {
      return (<div />);
    }
  }

  render() {
//     switch (stage) {
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

export default withRouter(connect(mapStateToProps, { createGame, updatePlayers, addUserToGame, fetchGame, advanceStage })(Lobby));
