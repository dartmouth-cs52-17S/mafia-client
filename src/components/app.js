import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/otherPage">Super Awesome NavLink</NavLink></li>
      </ul>
    </nav>
  );
};

const Welcome = (props) => {
  return (
    <div>
      Hello world!
    </div>
  );
};

const Reroute = (props) => {
  return (
    <div>
      Yay you routed succesfully!
    </div>
  );
};

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
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
