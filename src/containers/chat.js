import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import uuid from 'uuid';
import { socketserver } from './app';

class Chat extends Component {
  constructor(props) {
    super(props);

    const chatsocketserver = `${socketserver}chat`;
    this.socket = io.connect(chatsocketserver);
    this.socket.on('connect', () => {
      this.socket
        .emit('authenticate', { token: localStorage.getItem('token') })
        .on('authenticated', () => {
          this.socket.emit('room', this.props.gameID);
          console.log(`the gameID is ${this.props.gameID}`);
        })
        .on('unauthorized', (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
          throw new Error(msg.data.type);
        });
    });

    this.state = {
      text: '',
      chat: [],
    };

    this.socket.on('newchat', (newchat) => {
      this.setState({
        chat: newchat,
      });
    });

    this.onTextChange = this.onTextChange.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.renderChat = this.renderChat.bind(this);
  }

  componentDidMount() {
    this.chatEnd.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidUpdate() {
    this.chatEnd.scrollIntoView({ behavior: 'smooth' });
  }

  onTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleChatSubmit(event) {
    event.preventDefault();
    const message = {
      room: this.props.gameID,
      text: this.state.text,
    };
    this.socket.emit('message', message);
    this.setState({
      text: '',
    });
  }

  renderChat() {
    const chatlines = this.state.chat.map((line) => {
      if (line.type === 'message') {
        return (
          <div className="message"
            key={`${line.sender}${line.text}${uuid()}`}
          >
            <div className="chat-sender">
              {`${line.sender} `}
            </div>
            <div className="chat-message">
              {line.text}
            </div>
          </div>
        );
      }
      return (
        <div className="notice" key={`${line.text}${uuid()}`}>
          {line.text}
        </div>
      );
    });
    return chatlines;
  }

  render() {
    return (
      <div className="chat-render-container">
        <div className="all-chats">
          {this.renderChat()}
          <div ref={(node) => { this.chatEnd = node; }} />
        </div>
        <form onSubmit={this.handleChatSubmit} className="chat-input">
          <input onChange={this.onTextChange} value={this.state.text} type="text" placeholder="Type a message..." id="text-area" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    game: state.game,
    users: state.users,
  }
);

export default withRouter(connect(mapStateToProps)(Chat));
