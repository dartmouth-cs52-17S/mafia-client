import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchGames } from '../actions';
import Nav from './nav';

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    const gamelinks = this.props.games.all.map((game) => {
      return (
        <Link to={`/lobby/${game.id}`}>
          <button id="join-button"> {game.id} </button>
        </Link>
      );
    });

    if (!this.props.games.all) {
      return '';
    } else {
      return (
        <div>
          <Nav />
          {gamelinks}
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    games: state.game,
  }
);

export default withRouter(connect(mapStateToProps, { fetchGames })(JoinGame));
