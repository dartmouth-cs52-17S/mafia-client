import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import Profile from './profile';
import LandingPage from './landing_page';
import CreateOrJoinGame from './createOrJoinGame';
import JoinGame from './joinGame';
// import Nav from './nav';
import Lobby from './lobby';

export const RUNNING_LOCALLY = true;

export const socketserver = RUNNING_LOCALLY ? 'http://localhost:3000/' : 'http://mafia-sockets.herokuapp.com/';

const Directions = (props) => {
  return (
    <div className="ProfileDiv">
      Game Instructions!
    </div>
  );
};

const FallBack = (props) => {
  return (<div>URL Not Found</div>);
};

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = io.connect(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={CreateOrJoinGame} />
            <Route path="/lobby/:gameID" component={Lobby} />
            <Route exact path="/lobby" component={Lobby} />
            <Route path="/directions" component={Directions} />
            <Route path="/profile/:userID" component={Profile} />
            <Route path="/joinGame" component={JoinGame} />
            {/* <Route path="/chat" component={Chat} /> */}
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
