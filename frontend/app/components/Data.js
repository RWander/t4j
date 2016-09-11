import React from 'react';

export default class Data extends React.Component {
  static propTypes() {
    return {
      title: React.PropTypes.string.isRequired,
    };
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        { title }
      </div>
    );
  }
}
