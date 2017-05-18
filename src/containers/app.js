import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignUp from './signup';
// import Nav from './nav';

const LandingPage = (props) => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-upper">
        <img src="/images/logo.png" alt="Mafia" />
      </div>
      <Link to="/signup"><button className="signup"><span className="signup-text">Play Now</span></button></Link>
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
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/directions" component={Directions} />
          <Route path="/profile/:id" component={Profile} />
          {/* <Route path="/chat" component={Chat} /> */}
          <Route path="/cast" component={CharacterList} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
