import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import User from '../components/User';
import Data from '../components/Data';
import * as pageActions from '../actions/PageActions';

class App extends React.Component {
  static propTypes() {
    return {
      user: React.PropTypes.object.isRequired,
      data: React.PropTypes.object.isRequired,
      pageActions: React.PropTypes.object.isRequired
    };
  }

  render() {
    const { name } = this.props.user;
    const { title } = this.props.data;
    const { setData } = this.props.pageActions;

    return (
      <div>
        <User name={name} />
        <Data title={title} setData={setData} />
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
    pageActions: bindActionCreators(pageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
