import React, { Component } from 'react';
import styles from './SearchBox.scss';
import classNames from 'classnames/bind';
import {ComboBox} from 'components';

import * as Utils from 'lib/base/utils';

const cx = classNames.bind(styles);

class SearchBox extends Component {

  render() {
    let maxprice_options = [];
    
    let max_price = 400000;
    maxprice_options.push({value: 0, 
      label:'Any' , count: 0});


    for (let i = 0; i < 19; i ++){
      // nax_price.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      maxprice_options.push({value: max_price, 
        label:Utils.convertNumber2Currency(max_price) , count: 0});
        max_price += 50000;
      }
      
    const aspects = ['Any', 'North', 'East', 'South', 'West', 'North/East', 'South/East', 'South/West', 'North/West'];
    let aspect_options = [];
    aspect_options = aspects.map((value) => {
      return {value: value, label: value, count: 0};
    });
    
    const bedroom_options = ['Any', '1', '2', '3', '4+'].map((value) => {
      return {value: value, label: value, count: 0};
    })

    const bathroom_options = ['Any', '1', '1.5', '2', '2.5'].map((value) => {
      return {value: value, label: value, count: 0};
    })

    const car_options = ['Any', '1', '2', '3+'].map((value) => {
      return {value: value, label: value, count: 0};
    })

    const { options } = this.props;
    // console.log(`Max Price : ${options.maxPrice}`);
  
    return (
      <div className = {cx('searchbox')}>
        <div className = {cx('pan')}>
          <ComboBox title="Max price" options={maxprice_options} 
                    initValue={options.maxPrice} 
                    onChange={(index) => this.props.onChangeMaxPrice(index)} />
          <ComboBox title="Aspect"  options={aspect_options} 
                    initValue={options.aspect}
                    onChange={(index) => this.props.onChangeAspect(index)} />
        </div>
        <div className = {cx('pan')}>
          <ComboBox title="Beds" options={bedroom_options}
                    initValue={options.beds} 
                    onChange={(index) => this.props.onChangeBeds(index)} />
          <ComboBox title="Baths" options={bathroom_options}
                    initValue={options.baths} 
                    onChange={(index) => this.props.onChangeBaths(index)} />
          <ComboBox title="Cars" options={car_options}
                    initValue={options.cars} 
                    onChange={(index) => this.props.onChangeCars(index)} />
        </div>
      </div>
    );
  }
};

export default SearchBox;
