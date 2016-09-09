import React from 'react';
import ReactDOM from 'react-dom';
import Content from './Content';

export default function (data, containerId) {
  var container = document.getElementById(containerId || 'content');
  ReactDOM.render(
    <Content {...data} />,
    container
  );
}
