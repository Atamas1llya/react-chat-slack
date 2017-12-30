import Slack from 'slack';

export default class Bot {
  constructor({ username, token }) {
    this.bot = new Slack({ token: window.atob(token) });
    this.username = username;
  }

  getChannels = () => this.bot.channels.list({}).then(res => res.channels);

  sendMessage = (text, channel, thread_ts) => {
    if (thread_ts) {
      return this.bot.chat.postMessage({
        text,
        channel,
        thread_ts,
        as_user: false,
        username: this.username,
      });
    } else {
      return this.bot.chat.postMessage({
        text,
        channel,
        as_user: false,
        username: this.username,
      });
    }
  }

  getReplies = (channel, thread_ts) => this.bot.channels.replies({ channel, thread_ts })
}
