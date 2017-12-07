
import React, { Component } from 'react';

import { PlanList } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as unitActions from 'store/modules/unit';

class PlanListContainer extends Component{

  handleSelectChange = (index) => {
    console.log(`plan select changed : ${index}`);
    this.props.UnitActions.setCurrentPlan(index);
  }

  render() {
    const planData = this.props.plans;
    const curIndex = this.props.curIndex;
    return (
      <PlanList plans={planData} selected={curIndex} onSelectChange = {this.handleSelectChange}/>
    )
  }
}

export default connect(
  (state) => ({
    plans: state.unit.get('plansData').toJS(),
    curIndex: state.unit.get('curPlan')
  }),
  (dispatch) => ({
    UnitActions: bindActionCreators(unitActions, dispatch)
  })
)(PlanListContainer);
