import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import Textarea from 'react-textarea-autosize';
import { socketserver } from './app';

socketserver = `${socketserver}chat`;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(socketserver);
    this.socket.on('connect', () => {
      this.socket
        .emit('authenticate', { token: localStorage.getItem('token') })
        .on('authenticated', () => {
          console.log('joined chat');
        })
        .on('unauthorized', (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
          throw new Error(msg.data.type);
        });
    });

    this.state = {
      text: '',
      messages: [],
    };

    this.socket.on('message', (msg) => {
      const newmessages = [...this.state.messages, msg];
      this.setState({
        messages: newmessages,
      });
    });

    this.socket.on('notif', (notif) => {
      console.log(notif);
    });

    this.onTextChange = this.onTextChange.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
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

  renderMessages() {
    const messages = this.state.messages.map((message) => {
      return (
        <div>
          {`${message.sender}: ${message.text}`}
        </div>
      );
    });
    return messages;
  }

  render() {
    return (
      <div>
        {this.renderMessages()}
        <form onSubmit={this.handleChatSubmit}>
          <Textarea onChange={this.onTextChange} value={this.state.text} />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    game: state.game,
    players: state.players,
    player: state.player,
  }
);

export default withRouter(connect(mapStateToProps)(Chat));
