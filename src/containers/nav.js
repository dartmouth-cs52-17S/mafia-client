import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signoutUser } from '../actions';

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signoutUser(this.props.history);
  }

  render() {
    if (this.props.authenticated) {
      return (
        <nav>
          <Link to="/"><img className="logo-top-left" src="/images/fedora-hat.svg" alt="Mafia" /></Link>
          <form onSubmit={this.handleSubmit}>
            <button id="signoutbutt" to="/signout">Sign Out</button>
          </form>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link to="/"><img className="logo-top-left" src="/images/fedora-hat.svg" alt="Mafia" /></Link>
        </nav>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));


//   constructor(props) {
//     super(props);
//
//     // binding
//     this.onSignOutClick = this.onSignOutClick.bind(this);
//   }
//
//   onSignOutClick(event) {
//     event.preventDefault();
//     this.props.signoutUser(this.props.history);
//   }
//
//   renderEditButton() {
//     // console.log(`auth is ${this.props.auth}`);
//     if (this.props.auth) {
//       return (
//         <div className="Nav">
//           <NavLink exact to="/"><img src="/images/fedora-hat.svg" alt="Mafia" /></NavLink>
//           <div className="NavUser">
//             <NavLink exact to="/profile/:id">{this.props.user.username}</NavLink>
//             <button className="SignOutB" onClick={this.onSignOutClick}>Sign Out</button>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="Nav">
//           <NavLink exact to="/"><img src="/images/fedora-hat.svg" alt="Mafia" /></NavLink>
//           <div className="NavUser">
//             <NavLink exact to="/profile/:id">{this.props.user.username}</NavLink>
//             <button className="SignOutB" onClick={this.onSignOutClick}>Sign Out</button>
//           </div>
//         </div>
//       );
//     }
//   }
//
//   render() {
//     return (
//       <div>
//         {this.renderEditButton()}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => (
//   {
//     auth: state.auth.authenticated,
//     user: state.users.user,
//   }
// );

// export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
