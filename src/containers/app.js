import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import SignIn from './signin';
import SignUp from './signup';
import Users from './users';
import Profile from './profile';
import LandingPage from './landing_page';
// import Nav from './nav';

const socketserver = 'http://localhost:3000';

const Directions = (props) => {
  return (
    <div className="ProfileDiv">
      Game Instructions!
    </div>
  );
};

const Nav = (props) => {
  return (
    <nav>
      <img className="logo-top-left" src="/images/fedora-hat.svg" alt="Mafia" />
    </nav>
  );
};


const FallBack = (props) => {
  return (<div>URL Not Found</div>);
};

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = io.connect(socketserver);
    this.socket.on('connect', (data) => { console.log(`player ${data} connected`); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/directions" component={Directions} />
            <Route path="/profile/:userID" component={Profile} />
            <Route path="/users" component={Users} />

            {/* <Route path="/chat" component={Chat} /> */}
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
