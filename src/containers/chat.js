import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
<<<<<<< HEAD
import io from 'socket.io-client';
import Textarea from 'react-textarea-autosize';

const socketserver = 'http://localhost:3000/chat';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(socketserver);

    this.state = {
      text: '',
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleChatSubmit(event) {
    event.preventDefault();
    const message = {
      text: this.state.text,
    };
    this.socket.emit('message', message);
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleChatSubmit}>
          <Textarea onChange={this.onTextChange} value={this.state.text} />
          <button>Send</button>
        </form>
      </div>
    );
  }
=======

class Chat extends Component {

>>>>>>> 6909b3f8de566f50b378f70a4f63b094ac702dec
}

const mapStateToProps = state => (
  {
    game: state.game,
    players: state.players,
    player: state.player,
  }
);

export default withRouter(connect(mapStateToProps)(Chat));
