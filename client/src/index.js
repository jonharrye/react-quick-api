import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Match, Miss, Link} from 'react-router';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const ReactQuickApi = () => (
  <BrowserRouter>
    <div>
      <Match exactly pattern="/" component={App}/>
      <Match pattern="/about" component={About}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <ReactQuickApi />,
  document.getElementById('root')
);
