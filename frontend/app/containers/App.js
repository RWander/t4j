import React from 'react';
import { connect } from 'react-redux';
import styles from './App.css';

class App extends React.Component {
  static propTypes() {
    return {
      user: React.PropTypes.object.isRequired,
      data: React.PropTypes.object.isRequired
    };
  }

  render() {
    const { name } = this.props.user;
    const { title } = this.props.data;

    return (
      <div>
        <div className={ styles.app }>
          Привет, { name }!
        </div>
        <div>
          { title }
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    data: state.data
  };
}

export default connect(mapStateToProps)(App);
