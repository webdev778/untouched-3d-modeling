import React, {Component} from 'react';
import styles from './FloorSelect.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

export default class Floor extends Component{
  render() {
    return (
      <div onClick = {this.props.onClick} className = { this.props.selected ? cx('floor-item', 'active') : cx('floor-item') }><p>{this.props.children}</p></div>
    );
  }
}