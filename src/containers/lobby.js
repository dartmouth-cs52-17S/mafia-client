import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { createGame, updatePlayers, addUserToGame, ROOT_URL } from '../actions';
import Chat from './chat';
import { RUNNING_LOCALLY } from './app';

let socketserver;

if (RUNNING_LOCALLY) {
  socketserver = 'http://localhost:3000';
} else {
  socketserver = 'https://mafia-sockets.herokuapp.com';
}

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
    });

    this.renderPlayers = this.renderPlayers.bind(this);
  }

  // renderPlayers() {
  //   return this.props.game.players.map((fbid) => {
  //     if (fbid !== null) {
  //       let name;
  //       this.props.users.all.forEach((user) => {
  //         if (user.facebookID === fbid) {
  //           name = user.name;
  //         }
  //       });
  //       return (<li>{name}</li>);
  //     } else return <div />;
  //   });
  // }

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

  renderPlayers() {
    console.log(this.usersInLobby);
    return this.props.game.players.map((name) => {
      console.log('hi there');
      return (<li>{name}</li>);
    });
  }

  render() {
    return (
      <div>
        <div>
          <h3>Players Connected:</h3>
          <ul>
            {this.renderPlayers()}
          </ul>
        </div>
        <div>
          <Chat />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    game: state.game,
    users: state.users,
  }
);

export default withRouter(connect(mapStateToProps, { createGame, updatePlayers, addUserToGame })(Lobby));
