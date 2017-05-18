import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';

import { fetchProfile } from '../actions';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      author: props.profile.author,
      pic: props.profile.pic,
      kill: props.profile.kill,
      win: props.profile.win,
      lose: props.profile.lose,
      leave: props.profile.leave,
      scores: props.profile.scores,
      // maps
      badges: props.profile.badges,
      mostPlayed: props.profile.tags,
      past: props.profile.past,
      friends: props.profile.friends,
      isFriends: false,
    };

    // binding
    this.renderPast = this.renderPast.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
    this.renderMostPlayed = this.renderMostPlayed.bind(this);
    this.renderBadges = this.renderBadges.bind(this);
    this.renderHonorFriend = this.renderHonorFriend.bind(this);
    this.renderMain = this.renderMain.bind(this);
  }

  componentDidMount() {
    this.props.fetchProfile(this.props.match.params.profileID);
  }

  componentWillReceiveProps(props) {
    this.setState({
      author: props.profile.author,
      pic: props.profile.pic,
      kill: props.profile.kill,
      win: props.profile.win,
      lose: props.profile.lose,
      leave: props.profile.leave,
      scores: props.profile.scores,
      // maps
      badges: props.profile.badges,
      mostPlayed: props.profile.tags,
      past: props.profile.past,
      friends: props.profile.friends,
      isFriends: false,
    });
  }

  // individual section
  renderPast() {
    return this.state.past.entrySeq().map((past) => {
      return (
        <div className="pastSeg">{past}
        </div>
      );
    });
  }

  renderFriends() {
    return this.state.past.entrySeq().map((friend) => {
      return (
        <div className="friend">{friend}
        </div>
      );
    });
  }

  renderMostPlayed() {
    return this.state.past.entrySeq().map((role) => {
      return (
        <div>{role}</div>
      );
    });
  }

  renderBadges() {
    return this.state.past.entrySeq().map((badge) => {
      return (
        <div className="friend">{badge}
        </div>
      );
    });
  }


  renderHonorFriend() {
    if (this.state.isFriends) {
      return (
        <div className="Friends">
          {this.renderFriends()}
        </div>
      );
    } else {
      return (
        <div className="History">
          <div className="MostPlayed">{this.renderMostPlayed}</div>
          <div className="Badges">{this.renderBadges}</div>
        </div>
      );
    }
  }

  // Main
  renderMain() {
    return (
      <div>
        <div className="BasicInfor">
          <h2 className="KWL"> K/W/L {this.state.kill}/{this.state.win}/{this.state.lose}</h2>
          <div className="FriendNav">
            <h2> Total scores {this.state.scores}     Leave {this.state.leave}</h2>
            <button className="FriendsButton" onClick={() => this.setState({ isFriends: !this.state.isFriends })}>Friends</button>
          </div>
        </div>
        <div className="ProfileDisplay">
          <div className="ProfileLeft">
            <div className="ProfilePic" />
            <img src={this.state.pic || ''} alt="Profile Pic" />
            <div className="Past"> {this.renderPast()}
            </div>
          </div>
          <div className="HonorFriend">
            {this.renderHonorFriend()}
          </div>
        </div>
      </div>
    );
  }

  // render(), check if profile existss
  render() {
    // console.log(this.props.post);
    if (this.props.profile) {
      return (
        <div>
          {this.renderMain()}
        </div>
      );
    } else {
      return <div>Is Loading</div>;
    }
  }
}

const mapStateToProps = state => (
  {
    profile: state.profile,
  }
);

// export default withRouter(connect(mapStateToProps, { fetchPost, updatePost, deletePost })(Profile));
export default withRouter(connect(mapStateToProps, { fetchProfile })(Profile));
