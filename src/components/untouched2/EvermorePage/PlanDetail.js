import React from 'react';
import classNames from 'classnames/bind';
import styles from './EvermorePage.scss';

const cx = classNames.bind(styles);

const PlanDetail = ({planSrc}) => {
  return (
    <div className = {cx('plan-img')}>
      <img src={planSrc} alt="Untouched Pro"/>
    </div>
  );
}

export default PlanDetail;