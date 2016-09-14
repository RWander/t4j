import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import User from '../components/User';
import Data from '../components/Data';
import * as dataActions from '../actions/Data';

class App extends React.Component {
  static propTypes() {
    return {
      user: React.PropTypes.object.isRequired,
      data: React.PropTypes.object.isRequired,
      dataActions: React.PropTypes.object.isRequired
    };
  }

  render() {
    const { name } = this.props.user;
    const { title, fetching } = this.props.data;
    const { setData, setDataAsync, pingBackend } = this.props.dataActions;

    return (
      <div>
        <User name={name} />
        <Data title={title} fetching={fetching} setData={setData} setDataAsync={setDataAsync} pingBackend={pingBackend} />
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

function mapDispatchToProps(dispatch) {
  return {
    dataActions: bindActionCreators(dataActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
