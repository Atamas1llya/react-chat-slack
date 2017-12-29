import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { token } from '../config';

ReactDOM.render((
  <App
    token={token}
    channel_id="C5K5M62S0"
    username="Configurabe nickname"
    title="Need help?"
  />
), document.getElementById('root'));
