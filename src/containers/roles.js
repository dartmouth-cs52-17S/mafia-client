import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Nav from './nav';

class Roles extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.renderRole = this.renderRole.bind(this);
  }

  renderRole() {
    if (!localStorage.getItem('role')) {
      return '';
    } else {
      switch (!localStorage.getItem('role')) {
        case 'mafia': return (<div className="roleAssigned">Mafia</div>);
        case 'doctor': return (<div className="roleAssigned">Doctor</div>);
        case 'police': return (<div className="roleAssigned">Police</div>);
        case 'villager': return (<div className="roleAssigned">Villager</div>);
        default: return '';
      }
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="RolesContainer">
          <h2>You Are</h2>
          {this.renderRole()}
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Roles));
