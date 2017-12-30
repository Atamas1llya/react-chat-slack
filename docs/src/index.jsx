import React from 'react';
import ReactDOM from 'react-dom';
import ReactChatSlack from '../../dist/react-chat-slack';

import './styles.less';

const App = () => (
  <div>
    <div id="greeting">
      <span>react-chat-slack</span>
    </div>

    <ReactChatSlack
      token="xoxb-292610142212-JaKeibIprjTwisDmIAMR35pJ"
      channel_id="C8LM575GD"
      username="Anonymous user"
      title="Need help?"
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
