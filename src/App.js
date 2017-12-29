import React, { Component } from 'react';
import './styles/index.less';

import { token } from '../config';
import Bot from './bot';

export default class App extends Component {
  refresh = null;
  state = {
    messages: [],
    channel_id: null,
    thread_ts: null,
    username: 'UNKNOWN USER',
  }

  async componentDidMount() {
    this.bot = new Bot({
      username: this.state.username,
      token: token,
    })

    const channels = await this.bot.getChannels();
    const channel_id = channels.find(c => c.name === 'newusers').id;

    this.setState({ channel_id });
    this.refresh = setInterval(this.refreshReplies, 1000);
  }

  refreshReplies = async () => {
    console.log('123');
    const { channel_id, thread_ts } = this.state;

    if (thread_ts) {
      const { messages } = await this.bot.getReplies(channel_id, thread_ts);
      this.setState({ messages })
    }
  }

  handleMessageSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.children[0].value;
    e.target.reset();

    const { channel_id, thread_ts } = this.state;

    const result = await this.bot.sendMessage(message, channel_id, thread_ts);

    if (!this.state.thread_ts) {
      this.setState({
        thread_ts: result.ts,
      });
    }

    console.log(result);

    this.setState({
      messages: [
        ...this.state.messages,
        result.message,
      ]
    })

    document.querySelector('#react-chat-slack-messages').scrollTop = document.querySelector('#react-chat-slack-messages').scrollHeight;
  }

  render() {
    return (
      <div id="container">
        <div id="react-chat-slack">
          <div
            id="react-chat-slack-messages"
            className="messages-container"
          >
            {
              this.state.messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.username === this.state.username && 'my'}`}
                >{ message.text }</div>
              ))
            }
          </div>
          <div className="divider"></div>
          <form
            onSubmit={this.handleMessageSubmit}
            className="input-container"
          >
            <input type="text" autoFocus />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
}
