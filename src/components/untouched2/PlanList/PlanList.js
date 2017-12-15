import React, {Component} from 'react';
import styles from './PlanList.scss';
import classNames from 'classnames/bind';

import PlanCard from './PlanCard';

const cx = classNames.bind(styles);

export default class PlanList extends Component{
  state = {
    selected : this.props.selected
  }

  handleSelect = (index) => {
    this.setState({selected: index});
    console.log('Item '+index + ' just clicked');
    this.props.onSelectChange(index);
  }

  componentDidUpdate() {
    console.log('PlanList updated');
  }

  renderCards = () => {
    const plans_ary = this.props.plans;
    // const plans_ary = [1, 2, 3, 4, 5, 6, 7];
    return plans_ary.map((plan, i) => {
      // console.log('-------renderCards------');
      // console.log(plan);
      return (
        <PlanCard plan={plan} onClick={() => this.handleSelect(i)} key={i} selected={this.props.selected === i} index={i}/>
      )
    });
  }

  render() {
    console.log('PlanList rendering...');
    console.log(`State = `);
    console.log(this.state);
    console.log(`Props = `);
    console.log(this.props.selected);

    const {renderCards} = this;
    return (
      // <div className = {cx('image')}></div>  
      <div className = {cx('plan-list')}>
        {renderCards()}
      </div>        
    );
  }
}