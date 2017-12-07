import React from 'react';
import styles from './EvermorePage.scss';
import classNames from 'classnames/bind';

import { SearchSectionContainer, PlanSectionContainer } from 'containers';
// import LandScape from './LandScape';
// import Apartment from './Apartment';
// import Banner from './Banner';

const cx = classNames.bind(styles);

const EvermorePage = () => {

  return (
    <div className = {cx('evermore-page')}>
      <SearchSectionContainer />
      <PlanSectionContainer />
    </div>
  );

};

export default EvermorePage;