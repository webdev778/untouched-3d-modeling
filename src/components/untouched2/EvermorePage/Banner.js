import React from 'react';
import styles from './EvermorePage.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Banner = () => {
  return (
    <div className = {cx('banner')}>
      <div className = {cx('banner_title')}>
        <div>
          THE EVERMORE
        </div>
        <div className = {cx('banner_small')}>
          MELBOURNE
        </div>
      </div>
      <div className = {cx('banner_mark')}>
      </div>
    </div>
  );
}

export default Banner;