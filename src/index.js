import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Router from './route';
import { Provider } from 'react-redux';
import configStore from './redux/store';
const store = configStore()

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
