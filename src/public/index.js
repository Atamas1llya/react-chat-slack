import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactChatSlack from '../index';

import './styles.less';

class App extends Component {
  render() {
    return (
      <div>
        <div id="greeting">
          <span>react-chat-slack</span>
        </div>

        <ReactChatSlack
          token="xoxb-292610142212-rWlp23KS3TmtM3EOUE1N4bk3"
          channel_id="C8LM575GD"
          username="Anonymous user"
          title="Need help?"
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
