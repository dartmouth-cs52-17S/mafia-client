import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import Profile from './profile';
import LandingPage from './landing_page';
import CreateOrJoinGame from './createOrJoinGame';
import Nav from './nav';
import Lobby from './lobby';

export const RUNNING_LOCALLY = false;

export const socketserver = RUNNING_LOCALLY ? 'http://localhost:3000/' : 'http://online-mafia.herokuapp.com/';

const Directions = (props) => {
  return (
    <div className="ProfileDiv">
      Game Instructions!
    </div>
  );
};

// class Nav extends Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.signoutUser(this.props.history);
//   }
//
//   render() {
//     return (
//       <nav>
//         <Link to="/"><img className="logo-top-left" src="/images/fedora-hat.svg" alt="Mafia" /></Link>
//         <form onSubmit={this.handleSubmit}>
//           <button id="signoutbutt" to="/signout">Sign Out</button>
//         </form>
//       </nav>
//     );
//   }
// }

// export default connect(null, { signoutUser })(Nav);

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
          <Nav />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={CreateOrJoinGame} />
            <Route path="/lobby" component={Lobby} />
            <Route path="/lobby/:gameID" component={Lobby} />
            <Route path="/directions" component={Directions} />
            <Route path="/profile/:userID" component={Profile} />

            {/* <Route path="/chat" component={Chat} /> */}
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
