import React from 'react';

export default class Data extends React.Component {
  static propTypes() {
    return {
      data: React.propTypes.array.isRequired,
      title: React.PropTypes.string.isRequired,
      fetching: React.PropTypes.bool.isRequired,
      setData: React.PropTypes.func.isRequired,
      setDataAsync: React.propTypes.func.isRequired,
      loadData: React.propTypes.func.isRequired,
      pingBackend: React.propTypes.func.isRequired
    };
  }

  onClick(e) {
    this.props.setData(Date.now());
  }

  onClickAsync(e) {
    this.props.setDataAsync();
  }

  onPingBackend(e) {
    this.props.pingBackend();
  }

  render() {
    const { data, title, fetching } = this.props;

    return (
      <div>
        {
          data.map((item, i) => {
            return (
              <p key={i}>{ item }</p>
            );
          })
        }

        { fetching ? 'Загрузка..' : title }
        <button onClick={::this.onClick}>Генерировать</button>
        <button onClick={::this.onClickAsync}>Генерировать Async</button>
        <button onClick={::this.onPingBackend}>Ping Server</button>
      </div>
    );
  }
}
