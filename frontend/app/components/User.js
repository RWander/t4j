import React from 'react';

export default class User extends React.Component {
  static propTypes() {
    return {
      name: React.PropTypes.string.isRequired,
    };
  }

  render() {
    const { name } = this.props;

    return (
      <div>
        Привет, { name }!
      </div>
    );
  }
}
