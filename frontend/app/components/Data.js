import React from 'react';

export default class Data extends React.Component {
  static propTypes() {
    return {
      title: React.PropTypes.string.isRequired,
      setData: React.PropTypes.func.isRequired
    };
  }

  onClick(e) {
    this.props.setData(Date.now());
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        { title }
        <button onClick={this.onClick.bind(this)}>Генерировать</button>
      </div>
    );
  }
}
