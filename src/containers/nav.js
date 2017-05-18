// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter, NavLink } from 'react-router-dom';
// import { signoutUser } from '../actions';
//
// class Nav extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {};
//   }
//
//   signOutClicked = (event) => {
//     this.props.signoutUser(this.props.history);
//   }
//
//   renderAuthButton = () => {
//     if (this.props.auth.authenticated) {
//       return (
//         <li><button className="signout" onClick={this.signOutClicked}>Sign Out</button></li>
//       );
//     } else {
//       return (
//         <div className="navbar-right">
//           <li><NavLink className="link" to="/signin">Sign In</NavLink></li>
//           <li><NavLink className="link" id="signup" to="/signup">Sign Up</NavLink></li>
//         </div>
//       );
//     }
//   }
//
//   render() {
//     return (
//       <nav>
//         <ul className="navbar-left">
//           <li><NavLink className="link" exact to="/">Home</NavLink></li>
//           <li><NavLink className="link" to="/posts/new">New Post</NavLink></li>
//         </ul>
//         <ul>
//           {this.renderAuthButton()}
//         </ul>
//       </nav>
//     );
//   }
// }
//
// const mapStateToProps = state => (
//   {
//     auth: state.auth,
//   }
// );
//
// export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
