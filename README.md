# react-chat-slack

[![Build Status](https://travis-ci.org/Atamas1llya/react-chat-slack.svg?branch=master)](https://travis-ci.org/Atamas1llya/react-chat-slack)

## DEMO
https://atamas1llya.github.io/react-chat-slack/


## Usage

```
import ReactChatSlack from 'react-chat-slack';

class App extends Component {
  render() {
    return (
      <ReactChatSlack
        token="your_base64_encrypted_token_here"
        channel_id="slack_channel_id"
        username="user_name_to_display"
        title="Chat title"
        saveSession={true} // default is false
      />
    )
  }
}
```

## Options

`token`: **[REQUIRED]** : [BASE64 encoded](https://www.base64encode.org/) API token for the bot. You can create one [here](https://react-chat-slack.slack.com/apps/new/A0F7YS25R-bots).

`channel_id`: **[REQUIRED]**: Slack channel ID to send messages. To get channel ID visit https://my.slack.com/messages. For example, in url https://react-chat-slack.slack.com/messages/C8LM575GD/ channel ID is `C8LM575GD`

`username`: Bot display name.

`title`: Title of the chat tab.

`saveSession`: Save messages data between sessions.
