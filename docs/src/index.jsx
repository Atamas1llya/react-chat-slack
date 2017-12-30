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
      token="eG94Yi0yOTI2MTAxNDIyMTItaWpqUWRScnhmTTdOUnZORUdiOHBFYUNP"
      channel_id="C8LM575GD"
      username="Anonymous user"
      title="Need help?"
      saveSession
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
