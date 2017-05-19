import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { withRouter, NavLink } from 'react-router-dom';

import { fetchUsers } from '../actions';

class Users extends Component {

  constructor(props) {
    super(props);

    // binding
    this.renderUsers = this.renderUsers.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    console.log(this.props.users);
    if (this.props.users.data) {
      return (
        this.props.users.data.map((user) => {
          return (
            <div key={user.id}>{user.username}</div>
          );
        })
      );
    } else {
      return (
        <div className="History">{this.props.users}</div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderUsers()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    users: state.users.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchUsers })(Users));
