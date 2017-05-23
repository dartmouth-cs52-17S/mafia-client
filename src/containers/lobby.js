import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import jwt from 'jwt-simple';
import { addUserToGame } from '../actions';


const socketserver = 'http://localhost:3000';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(socketserver);

    this.socket.on('connect', () => this.props.addUserToGame(localStorage.getItem('fbid')));

    this.state = {};
  }

  componentDidMount() {
    console.log(localStorage.getItem('token'));
    console.log(jwt.decode(localStorage.getItem('token'), process.env.AUTH_SECRET));
  }

  renderPlayers() {
    setTimeout(() => {
      return this.props.game.players.map((person) => {
        return (<li>{person}</li>);
      });
    }, 2000);
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
    players: state.players,
    player: state.player,
  }
);

export default withRouter(connect(mapStateToProps, { addUserToGame })(Lobby));
