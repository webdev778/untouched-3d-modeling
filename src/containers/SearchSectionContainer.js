import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as unitActions from 'store/modules/unit'

import Banner from 'components/untouched2/EvermorePage/Banner';
import Apartment from 'components/untouched2/EvermorePage/Apartment';
import LandScape from 'components/untouched2/EvermorePage/LandScape';

import { SearchBoxContainer } from 'containers';

import styles from 'components/untouched2/EvermorePage/EvermorePage.scss';
import classNames from 'classnames/bind';

import _ from 'lodash';


const cx = classNames.bind(styles);

class SearchSectionContainer extends Component {

  componentDidMount() {
    this.props.UnitActions.getUnitData(this.props.searchOptions);
  }

  render() {
    const unit = this.props.selectedUnit.toJS();
    let view = '';
    if(!_.isEmpty(unit))
      view = unit.view;
    return (
      <div className = {cx('section1')}>
        <Banner/>
        <SearchBoxContainer/>
        <Apartment/>
        <LandScape view={view} />
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
    selectedUnit: state.unit.get('selectedUnit'),
    searchOptions: state.unit.get('searchOptions').toJS()
  }),
  (dispatch) => ({
    UnitActions: bindActionCreators(unitActions, dispatch)
  }))(SearchSectionContainer);
