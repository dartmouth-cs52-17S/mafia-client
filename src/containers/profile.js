import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';

import { fetchProfile } from '../actions';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    // binding
    this.renderProfile = this.renderProfile.bind(this);
    this.playedMostAs = this.playedMostAs.bind(this);
    this.renderBadges = this.renderBadges.bind(this);
  }

  componentDidMount() {
    this.props.fetchProfile(this.props.match.params.userID);
  }

  // individual section
  playedMostAs() {
    if (!this.props.profile.username) { // this just checks if data has been fetched and mapped to props yet
      return '';
    } else {
      const mafia = this.props.profile.roundsAsMafia;
      const police = this.props.profile.roundsAsPolice;
      const doctor = this.props.profile.roundsAsDoctor;
      const villager = this.props.profile.roundsAsVillager;
      const max = Math.max(mafia, police, doctor, villager);
      switch (max) {
        case mafia: return (<div className="MostFrequentPlayer">Mafia</div>);
        case villager: return (<div className="MostFrequentPlayer">Villager</div>);
        case doctor: return (<div className="MostFrequentPlayer">Doctor</div>);
        case police: return (<div className="MostFrequentPlayer">Police</div>);
        default: return '';
      }
    }
  }

  renderBadges() {
    if (this.props.profile.badges.length === 0) {
      return 'No Badges Yet! :(';
    } else {
      return this.props.profile.badges.map((badge) => {
        return (
          <div className="Badge-Singular">
            {badge}
          </div>
        );
      });
    }
  }

  // Render the profile page
  renderProfile() {
    return (
      <div className="ProfilePage">
        <div className="BasicInfo">
          <h2 className="Stats"> Wins: {this.props.profile.wins} / Losses: {this.props.profile.losses}</h2>
        </div>
        <div className="MainProfile">
          <div className="UserInfo">
            <div className="ProfilePic">
              <img src={this.props.profile.pic || ''} alt="Profile Pic" />
              <div>{this.props.profile.username}</div>
            </div>
          </div>
          <div className="GameData">
            <div className="MostPlayed">
              <h3>Most Played</h3>
              {this.playedMostAs()}
            </div>
            <div className="Badge-Section">
              <h3>Badges:</h3>
              <div className="Badges">{this.renderBadges()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  render() {
    /* check if profile has been mapped to props yet */
    if (this.props.profile.username) {
      return (
        <div>
          {this.renderProfile()}
        </div>
      );
    } else {
      /* If not then maybe we'll add a lil spinny loady here */
      return (<div>Loading Profile...</div>);
    }
  }
}

const mapStateToProps = state => (
  {
    profile: state.users.user,
  }
);

export default withRouter(connect(mapStateToProps, { fetchProfile })(Profile));
