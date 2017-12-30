import React, { Component } from 'react';
import './index.less';

import Bot from './bot';

export default class Chat extends Component {
  constructor({
    token, channel_id, username, title, saveSession = false,
  }) {
    super();
    this.state = {
      channel_id,
      username,
      thread_ts: null,
      messages: [],
      expanded: false,
      title,
      saveSession,
    };

    this.bot = new Bot({ username, token });
    this.refresh = setInterval(this.refreshReplies, 1000);
  }

  getStoredData = () => JSON.parse(localStorage.getItem('react-chat-slack-data')) || {
    messages: [],
    thread_ts: null,
  }

  storeData = (messages, thread_ts) => {
    localStorage.setItem('react-chat-slack-data', JSON.stringify({
      messages,
      thread_ts,
    }));
  }

  componentWillMount() {
    if (this.state.saveSession) {
      const { messages, thread_ts } = this.getStoredData();

      this.setState({ messages, thread_ts });
    }
  }

  componentWillUnmount() {
    clearInterval(this.refresh);
  }

  refreshReplies = async () => {
    const { channel_id, thread_ts } = this.state;

    if (thread_ts) {
      const { messages } = await this.bot.getReplies(channel_id, thread_ts);
      this.setState({ messages });
      this.storeData(messages, thread_ts);
      document.querySelector('#react-chat-slack-messages').scrollTop = document.querySelector('#react-chat-slack-messages').scrollHeight;
    }
  }

  handleMessageSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.children[0].value;
    if (!message.trim()) return false;

    e.target.reset();

    const { channel_id, thread_ts } = this.state;

    const result = await this.bot.sendMessage(message, channel_id, thread_ts);

    if (!this.state.thread_ts) {
      this.setState({
        thread_ts: result.ts,
      });
    }

    this.setState({
      messages: [
        ...this.state.messages,
        result.message,
      ],
    });

    document.querySelector('#react-chat-slack-messages').scrollTop = document.querySelector('#react-chat-slack-messages').scrollHeight;
  }

  render() {
    return (
      <div id="react-chat-slack">
        {
          this.state.expanded ? (
            <div id="react-chat-slack-box">
              <div
                id="react-chat-slack-greeting"
                onClick={() => this.setState({ expanded: false })}
              >{ this.state.title }
              </div>
              <div className="react-chat-slack-divider" />
              <div
                id="react-chat-slack-messages"
                className="react-chat-slack-messages-container"
              >
                {
                  this.state.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`react-chat-slack-message react-chat-slack-${message.username === this.state.username && 'my'}`}
                    >{ message.text }
                    </div>
                  ))
                }
              </div>
              <div className="react-chat-slack-divider" />
              <form
                onSubmit={this.handleMessageSubmit}
                className="react-chat-slack-input-container"
              >
                <input type="text" autoFocus />
                <button type="submit">Send</button>
              </form>
            </div>
          ) : (
            <div
              id="react-chat-slack-greeting"
              onClick={() => this.setState({ expanded: true })}
            >{ this.state.title }
            </div>
          )
        }
      </div>
    );
  }
}
