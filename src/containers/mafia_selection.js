import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { killUser } from '../actions';

class MafiaSel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      selectedPlayer: null,
    };
    this.onKillClick = this.onKillClick.bind(this);
  }

  onKillClick(event) {
    this.props.killUser();
    this.setState({ selectedPlayer: this.selectedPlayer });
  }

  render() {
    // if (!this.props.players) { // this just checks if data has been fetched and mapped to props yet
    //   return '';
    // } else if (this.props.players.indexOf(this.props.user.id) === this.players[0]) { // if current player is mafia, show this
    //   return (
    //     <div className="players_container">
    //       <ul>
    //         <li onKillClick={this.onKillClicked}> {this.players[0].pic} </li>
    //         <li onKillClick={this.onKillClicked}> {this.players[1].pic} </li>
    //         <li onKillClick={this.onKillClicked}> {this.players[2].pic} </li>
    //         <li onKillClick={this.onKillClicked}> {this.players[3].pic} </li>
    //         <li onKillClick={this.onKillClicked}> {this.players[4].pic} </li>
    //         <li onKillClick={this.onKillClicked}> {this.players[5].pic} </li>
    //       </ul>
    //     </div>
    //   );
    // } else { // if not mafia, show this
    //   return <div />;
    // }
    return <div>stage1</div>;
  }
}


const mapStateToProps = state => (
  {
    players: state.game.players,
    user: state.users.user,
  }
);

export default withRouter(connect(mapStateToProps, { killUser })(MafiaSel));
