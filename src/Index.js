import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import MainView from './components/MainView';

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={MainView}>
    </Route>
  </Router>
  , document.getElementById('content')
);
