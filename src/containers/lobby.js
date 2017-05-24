import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import jwt from 'jwt-simple';
import Selection from './mafia_selection';
import { createGame, updatePlayers, addUserToGame } from '../actions';
import Chat from './chat';

const socketserver = 'http://localhost:3000';
let stage = 0;

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(socketserver);

    this.socket.on('connect', () => this.props.addUserToGame(localStorage.getItem('fbid')));

    this.state = {};
  }

  componentDidMount() {
    if (this.props.game.id === 'unassigned') {
      this.props.createGame(localStorage.getItem('fbid'));
    } else {
      this.props.updatePlayers(localStorage.getItem('fbid'));
    }
  }

  onSubmit(event) {
    event.preventDefault();
    stage += 1;
    console.log(stage);
  }

  renderPlayers() {
    console.log(this.props.game.players);
    return this.props.game.players.map((person) => {
      if (person !== null) {
        return (<li>{person}</li>);
      } else return <div />;
    });
  }

  // renderPlayers() {
  //   setTimeout(() => {
  //     return this.props.players.map((player) => {
  //       return (<li>{player}</li>);
  //     });
  //   }, 2000);
  // }

  // renderRoles() {
  //   return (
  //     <div className="RolesContainer">
  //       <h2>You Are</h2>
  //       {this.props.player.role}
  //     </div>
  //   );
  // }

  // renderChat() {
  //
  // }

  // render() {
  //   return (
  //     <div className-"GameContainer">
  //       <div className="Roles">{this.renderRoles}</div>
  //       <div className="Roles">{}</div>
  //       // <div className="Selection">{this.renderselection}</div>  // all the pop ups
  //       // <div className="Chat">{this.renderChat}</div>
  //     </div>
  //   );
  // }

  render() {
//     switch (stage) {
//       case 0:
//         return (
//           <div>
//             <h3>Players Connected:</h3>
//             <ul>
//               {this.renderPlayers()}
//             </ul>
//             <button onClick={this.onSubmit}>Start Game</button>
//           </div>
//         );
//       case 1:
//         return (
//           <div>
//             Hurray!
//             {Selection}
//           </div>
//         );
//       default: return '';
//     }
    return (
      <div>
        <div>
          <h3>Players Connected:</h3>
          <ul>
            {this.renderPlayers()}
          </ul>
        </div>
        <div>
          <Chat />
        </div>
      </div>
    );
  }
  }


//   render() {
//     if (stage === 0) {
//       return (
//         <div>
//           <h3>Players Connected:</h3>
//           <ul>
//             {this.renderPlayers()}
//           </ul>
//           <button onClick={this.onSubmit}>Start Game</button>
//         </div>
//       );
//     } else if (stage === 1) {
//       console.log('Hrray');
//       return (
//         <Selection />
//       );
//     } else {
//       return (<div>Nothing</div>);
//     }
//   }
// }

const mapStateToProps = state => (
  {
    game: state.game,
    players: state.players.all,
    player: state.players.player,
  }
);

export default withRouter(connect(mapStateToProps, { createGame, updatePlayers, addUserToGame })(Lobby));
