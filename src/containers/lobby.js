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

    this.socket.on('connect', () => this.props.addUserToGame(localStorage.getItem('fbid')));

    this.state = {};
  }

  componentDidMount() {
    if (this.props.game.id === 'unassigned') {
      this.props.createGame(localStorage.getItem('fbid'));
    } else {
      this.props.updatePlayers(localStorage.getItem('fbid'));
    }
  }

  renderPlayers() {
    console.log(this.props.game.players);
    return this.props.game.players.map((person) => {
      if (person !== null) {
        return (<li>{person}</li>);
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
    players: state.players.all,
    player: state.players.player,
  }
);

export default withRouter(connect(mapStateToProps, { createGame, updatePlayers, addUserToGame })(Lobby));
