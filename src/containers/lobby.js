import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { createGame, createPlayers, updatePlayers, fetchPlayers, getPlayers, addUserToGame, fetchGame, checkEnd } from '../actions';
import Chat from './chat';
import { socketserver } from './app';
import Players from './playersDisplay';
import DoctorSelect from './doctor_selection';
import MafiaSelect from './mafia_selection';
import PoliceSelect from './police_selection';
import Voting from './voting';
import Nav from './nav';
import CountVotes from './count_votes';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.socket = io(socketserver);

    this.socket.on('fetchAll', () => {
      console.log('fetchAll');
      this.props.fetchPlayers(this.props.game.id);
      this.props.fetchGame(this.props.game.id);
    });

    this.socket.on('connect', () => {
      if (window.location.pathname === '/lobby' || window.location.pathname === '/lobby/') {
        this.props.createGame(localStorage.getItem('token'), this.props.history)
        .then(() => {
          this.props.getPlayers(localStorage.getItem('token'), this.props.match.params.gameID);
          this.socket.emit('join', this.props.match.params.gameID);
        });
      } else {
        this.props.getPlayers(localStorage.getItem('token'), this.props.match.params.gameID);
        this.socket.emit('join', this.props.match.params.gameID);
      }
      this.setState({});
      setTimeout(() => this.props.fetchGame(this.props.match.params.gameID), 1000);
    });

    this.state = {
      game: '',
      players: [],
    };

    this.renderPlayers = this.renderPlayers.bind(this);
    this.onPlayClicked = this.onPlayClicked.bind(this);
    this.renderPlayButton = this.renderPlayButton.bind(this);
    this.renderStage0 = this.renderStage0.bind(this);
    this.renderStage1 = this.renderStage1.bind(this);
    this.renderStage2 = this.renderStage2.bind(this);
    this.renderStage3 = this.renderStage3.bind(this);
    this.renderStage4 = this.renderStage4.bind(this);
    this.renderStages = this.renderStages.bind(this);
    this.renderChat = this.renderChat.bind(this);
    this.refetchAll = this.refetchAll.bind(this);
    this.tempOnPlayClicked = this.tempOnPlayClicked.bind(this);
    // this.backtoStage3 = this.backtoStage3.bind(this);
    // this.tempRenderNextButton = this.tempRenderNextButton.bind(this);
  }

  // Switch Stages
  // creates player objects based off of array of users
  onPlayClicked(event) {
    const playerIds = this.props.game.players.map((player) => { return player._id; });
    console.log(playerIds);
    this.props.createPlayers(this.props.game.id, playerIds);
    // this.props.advanceStage(this.props.game.id);
    this.socket.emit('updateStage', { id: this.props.game.id, stage: 1 });
  }
//  onPlayClicked, players are created.

// must delete
  tempOnPlayClicked(event) {
    this.socket.emit('updateStage', { id: this.props.game.id, stage: 4 });
  }

  // backtoStage3() {
  //   this.props.updateStage(this.props.game.id, 3);
  // }

  refetchAll() {
    this.props.fetchPlayers(this.props.game.id);
    this.props.fetchGame(this.props.game.id);
  }

  renderPlayButton() {
    if (this.props.game.players.length >= 1 && localStorage.getItem('userID') === this.props.game.creator) {
      return (<button onClick={this.onPlayClicked} id="render-butt" className="PlayButton">Play</button>);
    } else {
      return (<div />);
    }
  }

  // Stage 0: users are stored in "players"
  renderPlayers() {
    return this.props.game.players.map((player) => {
      return (<li key={player.id}>{player.name}</li>); // this is actually a user id
    });
  }

  renderRole() {
    switch (localStorage.getItem('role')) {
      // 0: mafia, 1: doctor, 3: police, 4-6: village
      case 'mafia':
        return (
          <div className="roleAssigned">
            <h3>The Mafia</h3>
            <img src="/images/mafia.png" alt="Mafia" />
          </div>
        );
      case 'doctor':
        return (
          <div className="roleAssigned">
            <h3>The Doctor</h3>
            <img src="/images/doctor.png" alt="Doctor" />
          </div>
        );
      case 'police':
        return (
          <div className="roleAssigned">
            <h3>The Police</h3>
            <img src="/images/police.png" alt="Police" />
          </div>
        );
      case 'villager':
        return (
          <div className="roleAssigned">
            <h3>A Villager</h3>
            <img src="/images/villager.png" alt="Villager" />
          </div>
        );
      default: return 'none. Why don\'t you have role? It\'s probably Adam\'s fault.';
    }
  }

  // Stage 0: Show Players Connected, Waiting for Players
  renderStage0() {
    return (
      <div className="stage0">
        <h3>Players Connected:</h3>
        <ul>
          {this.renderPlayers()}
          {this.renderPlayButton()}
        </ul>
      </div>
    );
  }

  // Stage 1: Assigning Role Processing
  renderStage1() {
    return (
      <div className="stage1">
        <h3>Assigning Roles...</h3>
        <div>
          <div className="spinny-loady" />
        </div>
        <div className="reactComment">{setTimeout(() => {
          this.socket.emit('updateStage', { id: this.props.game.id, stage: 2 });
        }, 2000)}
        </div>
      </div>
    );
  }

  // Stage 2: Dislay Assigned Roles to Individual Player
  renderStage2() {
    return (
      <div className="stage2">
        <h3>Roles have been assigned!</h3>
        <h2>Your role is:</h2>
        <div>{this.renderRole()}</div>
        <span>Will automatically advance stage after 10 secs</span>
        <div className="reactComment">{setTimeout(() => {
          this.socket.emit('updateStage', { id: this.props.game.id, stage: 3 });
        }, 2000)}
        </div>
      </div>
    );
  }

  // Stage 3:Display all players
  renderStage3() {
    return (
      <div>
        <Players fetch={id => this.socket.emit('fetch', id)} />
        <button onClick={this.tempOnPlayClicked}>Next</button>
      </div>
    );
  }

  // Stage 4: Mafia Kill
  renderStage4() {
    return (
      <div>
        <MafiaSelect fetch={id => this.socket.emit('fetch', id)} updateStage={(id, stage) => this.socket.emit('updateStage', { id, stage })} />
      </div>
    );
  }

  // Stage 5: Doctor Heal
  renderStage5() {
    return (
      <div>
        <DoctorSelect fetch={id => this.socket.emit('fetch', id)} updateStage={(id, stage) => this.socket.emit('updateStage', { id, stage })} />
      </div>
    );
  }

  // Stage 6: Police Reveal
  renderStage6() {
    return (
      <div>
        <PoliceSelect fetch={id => this.socket.emit('fetch', id)} updateStage={(id, stage) => this.socket.emit('updateStage', { id, stage })} />
      </div>
    );
  }

  renderStage7() {
    return (
      <div>
        <Voting fetch={id => this.socket.emit('fetch', id)} updateStage={(id, stage) => this.socket.emit('updateStage', { id, stage })} />
      </div>
    );
  }

  renderStage8() {
    return (
      <div>
        <CountVotes />
        <div className="reactComment">{setTimeout(() => {
          this.socket.emit('updateStage', { id: this.props.game.id, stage: 9 });
        }, 2000)}
        </div>
      </div>
    );
  }

  renderStage9() {
    return (
      <div>
        <h3>The people have spoken!</h3>
        <h5>The village has decided to kill...</h5>
        <div>{this.props.players.deadMan.name}</div>
      </div>
    );
  }

  renderStage10() {
    this.props.checkEnd(this.props.game.id);
    this.props.fetchGame(this.props.game.id);
    if (this.props.game.isOver) {
      return (
        <div>
          <div>Game Over</div>
          <div>Winner is {this.props.game.winner}</div>
        </div>
      );
    } else {
      return (
        <div className="reactComment">{setTimeout(() => {
          this.socket.emit('updateStage', { id: this.props.game.id, stage: 3 });
        }, 2000)}
        </div>
      );
    }
  }

  renderStages() {
    switch (this.props.game.stage) {
      case 0:
        return <div>{this.renderStage0()}</div>;
      case 1:
        return <div>{this.renderStage1()}</div>;
      case 2:
        return <div>{this.renderStage2()}</div>;
      case 3:
        return <div>{this.renderStage3()}</div>;
      case 4:
        return <div>{this.renderStage4()}</div>;
      case 5:
        return <div>{this.renderStage5()}</div>;
      case 6:
        return <div>{this.renderStage6()}</div>;
      case 7:
        return <div>{this.renderStage7()}</div>;
      case 8:
        return <div>{this.renderStage8()}</div>;
      case 9:
        return <div>{this.renderStage9()}</div>;
      case 10:
        return <div>{this.renderStage10()}</div>;
      default: return '';
    }
  }

  renderChat() {
    if (!this.props.match.params.gameID) {
      return (
        <div>
          <div>Chat is loading...</div>
          <div>
            If loading continues for more than 10 seconds, try force reloading.
          </div>
        </div>
      );
    }
    return (
      <Chat gameID={this.props.match.params.gameID} reload={this.refetchAll} />
    );
  }

  render() {
    if (!this.props.game) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <Nav />
          <div className="lobby-container">
            <div className="StagesDisplay">
              <h1>Stage: {this.props.game.stage}</h1>
              {this.renderStages()}
            </div>
            <div className="chat-section">
              {this.renderChat()}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  game: state.game,
  users: state.users,
  players: state.players,
});

export default withRouter(connect(mapStateToProps, { createPlayers, createGame, updatePlayers, fetchPlayers, getPlayers, addUserToGame, fetchGame, checkEnd })(Lobby));
