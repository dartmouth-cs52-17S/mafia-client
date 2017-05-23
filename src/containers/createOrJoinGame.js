import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class CreateOrJoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Link to="/lobby"><button>Join Game</button></Link>
    );
  }
}

const mapStateToProps = state => (
  {
    game: state.game,
  }
);

export default withRouter(connect(mapStateToProps, null)(CreateOrJoinGame));
