import React, {Component} from 'react';
import styles from './EvermorePage.scss';
import classNames from 'classnames/bind';
import { Building3D } from 'components';
// import { Building3DContainer } from 'containers';

const cx = classNames.bind(styles);

export default class Aparment extends Component{
  render() {
    return (
      <div className = {cx('apartmentbox')}>
        <div>
          <p className = {cx('header')}> Apartment </p>
        </div>
        <div className = {cx('image')}>
          {/* <Building3DContainer /> */}
          <Building3D />
          {/* <iframe src="/UNTOUCHED/Building/index.html" title='asd' /> */}
        </div>
      </div>
    );
  }
}