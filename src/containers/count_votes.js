import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tallyVotes } from '../actions';

class CountVotes extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.tallyVotes(this.props.game.id);
  }

  render() {
    return (
      <div>
        <h3>Tallying the Votes...</h3>
        <div>
          <div className="spinny-loady" />
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

export default withRouter(connect(mapStateToProps, { tallyVotes })(CountVotes));
