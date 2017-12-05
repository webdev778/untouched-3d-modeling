import React from 'react';
import styles from './EvermorePage.scss';
import classNames from 'classnames/bind';

import { SearchBox, PlanList, FloorSelect } from 'components';
import LandScape from './LandScape';
import Apartment from './Apartment';
import Banner from './Banner';

const cx = classNames.bind(styles);

const EvermorePage = () => {

  const test_plans = [{
    size : 51,
    aspect : 'West',
    img : './images/floor_plan/1.png'
  },
  {
    size : 55,
    aspect : 'West',
    img : './images/floor_plan/2.png'
  },
  {
    size : 71,
    aspect : 'North',
    img : './images/floor_plan/3.png'
  },
  {
    size : 72,
    aspect : 'West',
    img : './images/floor_plan/1.png'
  },
  {
    size : 75,
    aspect : 'West/North',
    img : './images/floor_plan/1.png'
  },
  {
    size : 80,
    aspect : 'West',
    img : './images/floor_plan/1.png'
  }
  ];


  const units = [
    {
      price : 250000,
      bedrooms : 2,
      bathrooms : 1,
      aspect : 5,
      parking : 1,
      internal_in_meters : 59.0,
      floor : 5,
      status : 0,
      planimg : '/static/media/exam-view.3a2c548d.png', 
      view : '/static/media/exam-view.3a2c548d.png',
      render : '02A'
    },
    {
    price : 280000,
    bedrooms : 2,
    bathrooms : 1,
    aspect : 5,
    parking : 1,
    internal_in_meters : 59.0,
    floor : 7,
    status : 0,
    planimg : '/static/media/exam-view.3a2c548d.png', 
    view : '/static/media/exam-view.3a2c548d.png',
    render : '02A'
    },
    {
      price : 350000,
      bedrooms : 2,
      bathrooms : 1,
      aspect : 5,
      parking : 1,
      internal_in_meters : 59.0,
      floor : 5,
      status : 0,
      planimg : '/static/media/exam-view.3a2c548d.png', 
      view : '/static/media/exam-view.3a2c548d.png',
      render : '02A'
    }];

  const search_options = {
    max_price : 300000,
    aspect : 5,
    bedrooms : 2,
    bathrooms : 1,
    parking : 1
  }

  const filtered = units.filter((unit)=>{
    if (unit.price <= search_options.max_price && unit.aspect === search_options.aspect &&
        unit.bedrooms === search_options.bedrooms && unit.bathrooms === search_options.bathrooms
        && unit.parking === search_options.parking)
      return true;
    return false;
  });
  console.log('filtered array');
  console.log(filtered);

  const f_plans = filtered.map(unit => {
    return {aspect : unit.aspect, size: unit.internal_in_meters, img: unit.planimg}
  }).sort((a,b) => (a.size - b.size)).filter((plan, index, self) => index === 
            self.findIndex((t) => (t.aspect === plan.aspect && t.size === plan.size ))
            );
            
  console.log(f_plans);

  const curPlanIndex = 0;
  // f_plans[curPlanIndex]

  const floorList = filtered.filter( (unit)=> (
    unit.aspect === f_plans[curPlanIndex].aspect && unit.internal_in_meters === f_plans[curPlanIndex].size 
  )).map((unit)=>(unit.floor));
  console.log('Floor List');
  console.log(floorList);

  const curFloorIndex = 0;

  const selectedUnit = filtered.filter( unit => {
    const curPlan = f_plans[curPlanIndex];
    const curFloor = floorList[curFloorIndex];
    return unit.aspect === curPlan.aspect && unit.internal_in_meters == curPlan.size
    && unit.floor === curFloor;
  })[0];

  console.log('Selected Unit');
  console.log(selectedUnit);
  const curView = selectedUnit.view;
  const curPlan = selectedUnit.planimg;
  console.log('Current Plan:');
  console.log(curPlan);

  // const views = ['/static/media/exam-view.3a2c548d.png',
  //               '/static/media/exam-apart.1de7e8e7.png'];

  // const curIndex = 0;
  // const curView = views[curIndex];

  return (
    <div className = {cx('evermore-page')}>
      <div className = {cx('section1')}>
        <Banner/>
        <SearchBox/>
        <Apartment/>
        <LandScape view={curView} />
      </div>
      <div className={cx('section2')}>
        <PlanList plans={test_plans} />
        <div className={cx('section3')}>
          <div className = {cx('title')}>Floorplan</div>
          
          <img className = {cx('plan-img')} src="./images/floor_plan/1.png" alt="Untouched Pro"/>
          <div className = {cx('floor-select-container')}>
            <div className = {cx('header')}>
              <p>Choose a floor</p>
            </div>
            <FloorSelect />
            {/* <div className = {cx('floor-select')}>
              <div className = {cx('floor-item')}><p>1</p></div>
              <div className = {cx('floor-item')}><p>3</p></div>
              <div className = {cx('floor-item')}><p>5</p></div>
              <div className = {cx('floor-item')}><p>7</p></div>
              <div className = {cx('floor-item')}><p>9</p></div>
            </div> */}
          </div>
          <div className = {cx('price-container')}>
            <div className = {cx('price')}>
              {'$520,000'}
            </div>
            <div className = {cx('button-group')}>
              <button>VR</button>
              <button>Reserve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default EvermorePage;