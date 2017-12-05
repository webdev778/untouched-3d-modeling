import React, {Component} from 'react';
import styles from './PlanList.scss';
import classNames from 'classnames/bind';

import PlanCard from './PlanCard';

const cx = classNames.bind(styles);

export default class PlanList extends Component{
  state = {
    selected : -1
  }

  handleSelect = (index) => {
    this.setState({selected: index});
    console.log('Item '+index + ' just clicked');
  }

  renderCards = () => {
    const plans_ary = this.props.plans;
    // const plans_ary = [1, 2, 3, 4, 5, 6, 7];
    return plans_ary.map((plan, i) => {
      return (
        <PlanCard plan={plan} onClick={() => this.handleSelect(i)} key={i} selected={this.state.selected === i} index={i}/>
      )
    });
  }

  render() {
    const {renderCards} = this;
    return (
      // <div className = {cx('image')}></div>  
      <div className = {cx('plan-list')}>
        {renderCards()}
      </div>        
    );
  }
}