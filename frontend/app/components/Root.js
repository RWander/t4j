import React from 'react';
import { Link } from 'react-router';

const Root = ({ children }) => (
  <div>
    <header>
      Links:
      {' '}
      <Link to="/">Home</Link>
      {' '}
      <Link to="/foo">Foo</Link>
      {' '}
      <Link to="/bar">Bar</Link>
    </header>
    { children }
  </div>
);

export default Root;
