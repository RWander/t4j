import React from 'react';
import { connect } from 'react-redux';
import User from '../components/User';
import Data from '../components/Data';

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
        <User name={name} />
        <Data title={title} />
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
