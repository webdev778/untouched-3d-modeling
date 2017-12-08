import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as unitActions from 'store/modules/unit';

import styles from '../components/untouched2/EvermorePage/EvermorePage.scss';
import classNames from 'classnames/bind';
import PlanDetail from '../components/untouched2/EvermorePage/PlanDetail';
import { FloorSelect, PlanList } from 'components';
import * as Utils from 'lib/base/utils';

const cx = classNames.bind(styles);

class PlanSectionContainer extends Component{

  getPlanImage = () => {
    const plans = this.props.plans.toJS();
    const curPlanIndex = this.props.curPlanIndex;
    let result = '';

    if (plans.length > 0 && curPlanIndex >= 0)
      result = plans[curPlanIndex].img;

    return result;
  }

  handleFloorSelect = (index) => {
    console.log('handleFloorSelect');

    this.props.UnitActions.setFloorIndex(index);
  }

  // renderPrice = () => {

  // }

  handlePlanSelect = (index) => {
    console.log(`plan select changed : ${index}`);
    this.props.UnitActions.setCurrentPlan(index);
  }

  render() {
    // const unit = this.props.unitsData[this.props.selectedUnit];
    const plan_src = this.getPlanImage();
    const floorList = this.props.floors.toJS();
    const curFloorIndex = this.props.curFloorIndex;
    console.log(this.props.selectedUnit);
    const curUnit = this.props.selectedUnit.toJS();
    const planData = this.props.plans.toJS();
    const curPlanIndex = this.props.curPlanIndex;
    let price = '';

    console.log('<<<<<<<<<<<<<<Current Selected Unit>>>>>>>>>>>>>>>>>');
    console.log(curUnit);
    console.log(`floor length = ${floorList.length}`);
    if (curUnit !== undefined && curUnit !== null)
      price = Utils.convertNumber2Currency(curUnit.price);

    return (
      <div className={cx('section2')}>
        <PlanList plans={planData} selected={curPlanIndex} onSelectChange = {this.handlePlanSelect}/>
        <div className={cx('section3')}>
          <div className = {cx('title')}>Floorplan</div>          
          <PlanDetail planSrc={plan_src} />
          <div className = {cx('floor-select-container')}>
            <div className = {cx('header')}>
              <p>{ floorList.length === 1 ? 'Last One' : 'Choose a floor'}</p>
            </div>
            <FloorSelect floorData={floorList} selected={curFloorIndex} onSelectChange = {this.handleFloorSelect}/>
          </div>
          <div className = {cx('price-container')}>
            <div className = {cx('price')}>
              {price}
            </div>
            <div className = {cx('button-group')}>
              <button>VR</button>
              <button>Reserve</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    curPlanIndex: state.unit.get('curPlan'),
    curFloorIndex: state.unit.get('curFloor'),
    plans: state.unit.get('plansData'),
    floors: state.unit.get('floorsData'),
    selectedUnit: state.unit.get('selectedUnit')
  }),
  (dispatch) => ({
    UnitActions: bindActionCreators(unitActions, dispatch)
  })
)(PlanSectionContainer);