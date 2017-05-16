import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/otherPage">Super Awesome NavLink</NavLink></li>
        <li><NavLink to="/cast">Cast List</NavLink></li>
        <li><NavLink to="/directions">Directions</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/chat">Chat</NavLink></li>
      </ul>
    </nav>
  );
};

const Welcome = (props) => {
  return (
    <div className="welcomeDiv">
      Hello world!
    </div>
  );
};

const Reroute = (props) => {
  return (
    <div className="RerouteDiv">
      Yay you routed succesfully!
    </div>
  );
};

const Profile = (props) => {
  return (
    <div className="ProfileDiv">
      Your cool profile!
    </div>
  );
};

const Directions = (props) => {
  return (
    <div className="ProfileDiv">
      Game Instructions!
    </div>
  );
};

const Chat = (props) => {
  return (
    <div className="ChatDiv">
      On Game chatting!
    </div>
  );
};

const CharacterList = ((props0) => {
  return (
    <div className="CharDiv">
      <h1>The Bad Guys</h1>
      <ul>
        <li>The Mafia <i className="fa fa-hand-o-right" /></li>
      </ul>
      <h1>The Good Guys</h1>
      <ul>
        <li>The Doctor <i className="fa fa-plus-square" /></li>
        <li>The Detective <i className="fa fa-eye" /></li>
      </ul>
      <h1>The Everyone Else Guys</h1>
      <ul>
        <li>The Villagers <i className="fa fa-male" /></li>
        <li>The Tanner <i className="fa fa-frown-o" /></li>
      </ul>
    </div>
  );
});

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/otherPage" component={Reroute} />
          <Route path="/directions" component={Directions} />
          <Route path="/profile" component={Profile} />
          <Route path="/chat" component={Chat} />
          <Route path="/cast" component={CharacterList} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
