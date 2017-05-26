import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPlayers, healPlayer } from '../actions';

class DoctorSel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onHealClick = this.onHealClick.bind(this);
    this.renderSelection = this.renderSelection.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlayers();
  }

  onHealClick(event) {
    this.props.healPlayer(event.target.key);
  }

  renderSelection() {
    if (!localStorage.getItem('role')) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else if (localStorage.getItem('role') === 'doctor') {
      return (
        this.props.players.map((player) => {
          return (
            <div className="players_container">
              <div className="playerName">{player.user.name}</div>
              <img onKillClick={this.onHealClick} src={player.user.pic || ''} alt="Player Alive" key={player._id} />
            </div>
          );
        })
      );
    } else {
      return <div className="wait">Waiting Mafia to Kill</div>;
    }
  }
  render() {
    return (
      <div className="RolesContainer">
        <h2>You Are</h2>
        {this.renderSelection()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    players: state.players.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPlayers, healPlayer })(DoctorSel));
