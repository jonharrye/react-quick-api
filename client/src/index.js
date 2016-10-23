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

const NoMatch = ({location}) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
);

const ReactQuickApi = () => (
  <BrowserRouter>
    <div>
      <Match exactly pattern="/" component={App}/>
      <Match pattern="/about" component={About}/>
      <Miss component={NoMatch}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <ReactQuickApi />,
  document.getElementById('root')
);
