// import React, { Component } from 'react';
//
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// // import { withRouter, NavLink } from 'react-router-dom';
//
// import { fetchProfile, fetchGame } from '../actions';
//
// class Profile extends Component {
//
//   constructor(props) {
//     super(props);
//
//     this.state = {};
//
//     // binding
//     this.assignRoles = this.assignRoles.bind(this);
//   }
//
//   componentDidMount() {
//     this.props.fetchGame();
//     this.props.fetchProfile();
//   }
//
//   render() {
//     return (
//       <div className="NarrationContainer">
//         <h1>The Village</h1>
//         <h3 className="roleAssigned">{this.props.participant.currentRole}</h3>
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = state => (
//   {
//     game: state.game.all,
//     participant: state.users.user,
//   }
// );
//
// export default withRouter(connect(mapStateToProps, { fetchProfile, fetchGame })(Profile));
