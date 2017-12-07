import React, { Component } from 'react';
import styles from './PlanList.scss';
import classNames from 'classnames/bind';

import {aspects} from 'lib/base/constants';

const cx = classNames.bind(styles);

export default class PlanCard extends Component{
  // state =  {
  //   selected: false
  // };

  // handleClick = () => {
  //   // this.setState({selected: !this.state.selected});
  //   this.props.onClick();
  // }
  render() {
    // console.log(this.props.index + ' selected: '+this.props.selected);
    return (
      <div className={ this.props.selected ? cx('plan-card', 'active') : cx('plan-card')} onClick={this.props.onClick}>
        <img className={cx('img')} src={this.props.plan.img} alt='Untouched Pro'></img>
        <div className={cx('info')}>
          <div className={cx('size')}>{this.props.plan.size+' '}m2</div>
          <div className={cx('aspect')}>{aspects[this.props.plan.aspect]}</div>
        </div>
      </div>
    );
  }
}