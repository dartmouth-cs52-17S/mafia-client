import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Nav from './nav';

class CreateOrJoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="join-container">
          <Link to="/joinGame">
            <button id="join-button">
              <i className="fa fa-sign-in" aria-hidden="true" /> <br />
              Join Game
            </button>
          </Link>
          <Link to="/lobby">
            <button id="join-button">
              <i className="fa fa-gamepad" aria-hidden="true" /> <br />
              Create Game
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    game: state.game,
  }
);

export default withRouter(connect(mapStateToProps, null)(CreateOrJoinGame));
