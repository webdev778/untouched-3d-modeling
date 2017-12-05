import React, {Component} from 'react';
import styles from './EvermorePage.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

export default class Aparment extends Component{
  render() {
    return (
      <div className = {cx('apartmentbox')}>
        <div>
          <p className = {cx('header')}> Apartment </p>
        </div>
        <div className = {cx('image')}>
        </div>
      </div>
    );
  }
}