import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import jwt from 'jwt-simple';
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
    console.log(localStorage.getItem('token'));
    console.log(jwt.decode(localStorage.getItem('token'), process.env.AUTH_SECRET));
  }

  renderPlayers() {
    if (this.props.game.players) {
      return this.props.game.players.map((person) => {
        return (<li>{person}</li>);
      });
    } else {
      return (<div />);
    }
  }

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
  }
);

export default withRouter(connect(mapStateToProps, { createGame, updatePlayers, addUserToGame })(Lobby));
