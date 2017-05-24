import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { killUser } from '../actions';

class MafiaSel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(event) {
    this.props.updatePlayer();
  }

  render() {
    if (!this.props.players) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else if (this.props.player.role === 'mafia') { // if current player is mafia, show this
      return (
        <div className="players_container">
          <ul>
            <button onClick={this.onSelect}> {this.players[0].pic} </button>
            <button onClick={this.onSelect}> {this.players[1].pic} </button>
            <button onClick={this.onSelect}> {this.players[2].pic} </button>
            <button onClick={this.onSelect}> {this.players[3].pic} </button>
            <button onClick={this.onSelect}> {this.players[4].pic} </button>
            <button onClick={this.onSelect}> {this.players[5].pic} </button>
          </ul>
        </div>
      );
    } else { // if not mafia, show this
      return <div />;
    }
  }
}


const mapStateToProps = state => (
  {
    players: state.game.players,
  }
);

export default withRouter(connect(mapStateToProps, { killUser })(MafiaSel));
