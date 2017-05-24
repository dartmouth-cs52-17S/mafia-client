import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { createGame, updatePlayers, addUserToGame } from '../actions';

const socketserver = 'http://localhost:3000';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(socketserver);

    this.socket.on('connect', () => {
      if (this.props.game.id === 'unassigned') {
        this.props.createGame(localStorage.getItem('token'), this.props.history);
      } else {
        this.props.updatePlayers(localStorage.getItem('fbid'));
      }
    });

    this.state = {};
  }

  renderPlayers() {
    return this.props.game.players.map((fbid) => {
      if (fbid !== null) {
        let name;
        this.props.users.all.forEach((user) => {
          if (user.facebookID === fbid) {
            name = user.name;
          }
        });
        return (<li>{name}</li>);
      } else return <div />;
    });
  }

  // renderPlayers() {
  //   setTimeout(() => {
  //     return this.props.players.map((player) => {
  //       return (<li>{player}</li>);
  //     });
  //   }, 2000);
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

  render() {
    return (
      <div>
        <h3>Players Connected:</h3>
        <ul>
          {this.renderPlayers()}
        </ul>
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
