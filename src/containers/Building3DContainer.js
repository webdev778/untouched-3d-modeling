import React, { Component } from 'react';
import { Building3D } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as unitActions from 'store/modules/unit';

class Building3DContainer extends Component{

  handleClick = (room) => {
    console.log(`${room} selected`);
  }

  render(){
    const units = this.props.units;
    const light_states = [];

    // Object.keys(apt_able_ary).forEach((key) => {
    //   apt_able_ary[key].able = false;
    // });

    // console.log('apt_able_ary test');
    // console.log(apt_able_ary);

    units.forEach((unit) => {
      light_states.push(unit.render)
    });

    console.log('light information');
    console.log(light_states);

    return(
      // <Building3D lightData = {light_states} onClick={this.handleClick}/>
      <div></div>
    )
  }
}

export default connect(
  (state) => ({
    units: state.unit.get('unitsData').toJS(),
    selectedUnit: state.unit.get('selectedUnit').toJS()
  }),
  (dispatch) => ({
    UnitActions: bindActionCreators(unitActions, dispatch)
  })
)(Building3DContainer);