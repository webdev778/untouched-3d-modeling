import React, { Component } from 'react';

// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

import { Header } from 'components';

class HeaderContainer extends Component {
  handleButtonClick = () => {
    console.log('haha');
    const { BaseActions } = this.props;
    BaseActions.doTestAction();
  }

  render() {
    const { handleButtonClick } = this;
    const { test } = this.props;
    return (
      <div>
        <Header onClickButton={handleButtonClick}/>
        <h1>{ test }</h1>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    test: state.base.get('test')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(HeaderContainer);