import React, { Component } from 'react';

// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as testActions from 'store/modules/test';
import * as unitActions from 'store/modules/unit';

import { SearchBox } from 'components';

class SearchBoxContainer extends Component {

  handleMaxPriceChange= async (newIndex) => {
    await this.props.UnitActions.changeMaxPrice(newIndex);
    console.log('----- MaxPrice change evented ----');
    this.filter();
  }

  handleAspectChange= async (newIndex) => {
    await this.props.UnitActions.changeAspect(newIndex);
    console.log('----- Aspect change evented ----');
    this.filter();
  }

  handleBedsChange= async(newIndex) => {
    await this.props.UnitActions.changeBeds(newIndex);
    console.log('----- Bedrooms change evented ----');
    this.filter();
  }

  handleBathsChange= async(newIndex) => {
    await this.props.UnitActions.changeBaths(newIndex);
    console.log('----- Bathrooms change evented ----');
    this.filter();
  }

  handleCarsChange= async (newIndex) => {
    await this.props.UnitActions.changeCards(newIndex);
    console.log('----- Cars change evented ----');
    this.filter();
  }

  filter = () => {
    const searchOption = this.props.searchOptions.toJS();
    this.props.UnitActions.getUnitData(searchOption);
  }

  render() {    
    const curOptions  = this.props.searchOptions.toJS();

    return (
      <div>
        <SearchBox           
          options = {curOptions}
          onChangeMaxPrice={this.handleMaxPriceChange}
          onChangeAspect={this.handleAspectChange}
          onChangeBeds={this.handleBedsChange}
          onChangeBaths={this.handleBathsChange}
          onChangeCars={this.handleCarsChange}
          />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    searchOptions: state.unit.get('searchOptions')
  }),
  (dispatch) => ({
    UnitActions: bindActionCreators(unitActions, dispatch)
  })
)(SearchBoxContainer);