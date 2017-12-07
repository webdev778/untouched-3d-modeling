
import {createAction, handleActions} from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as UnitAPI from 'lib/api/unit';

// action types
const SEARCH_OPTION_MAXPRICE_CHANGE_ACTION = 'unit/SEARCH_OPTION_MAXPRICE_CHANGE_ACTION';
const SEARCH_OPTION_ASPECT_CHANGE_ACTION = 'unit/SEARCH_OPTION_ASPECT_CHANGE_ACTION';
const SEARCH_OPTION_BEDS_CHANGE_ACTION = 'unit/SEARCH_OPTION_BEDS_CHANGE_ACTION';
const SEARCH_OPTION_BATHS_CHANGE_ACTION = 'unit/SEARCH_OPTION_BATHS_CHANGE_ACTION';
const SEARCH_OPTION_CARS_CHANGE_ACTION = 'unit/SEARCH_OPTION_CARS_CHANGE_ACTION';

const GET_UNIT_DATA = 'unit/GET_UNIT_DATA';
const SET_CURRENT_PLAN = 'unit/SET_CURRENT_PLAN';
const SET_FLOOR_INDEX = 'unit/SET_FLOOR_INDEX';

// action creator
export const changeMaxPrice = createAction(SEARCH_OPTION_MAXPRICE_CHANGE_ACTION);
export const changeAspect = createAction(SEARCH_OPTION_ASPECT_CHANGE_ACTION);
export const changeBeds = createAction(SEARCH_OPTION_BEDS_CHANGE_ACTION);
export const changeBaths = createAction(SEARCH_OPTION_BATHS_CHANGE_ACTION);
export const changeCards = createAction(SEARCH_OPTION_CARS_CHANGE_ACTION);
export const getUnitData = createAction(GET_UNIT_DATA, UnitAPI.getUnitData);
export const setCurrentPlan = createAction(SET_CURRENT_PLAN);
export const setFloorIndex = createAction(SET_FLOOR_INDEX);

// initial state
const initialState = Map({
  searchOptions: Map({
    maxPrice: 0,
    aspect: 0,
    beds: 0,
    baths: 0,
    cars: 0
  }),
  unitsData: List([]), // filtered units
  plansData: List([]),
  curPlan: -1,
  curFloor: -1,
  floorsData: List([]),
  selectedUnit: Map({})
});

// reducer
export default handleActions({
  [SEARCH_OPTION_MAXPRICE_CHANGE_ACTION]: (state, action) => {
    return state.setIn(['searchOptions', 'maxPrice'], action.payload);
  },
  [SEARCH_OPTION_ASPECT_CHANGE_ACTION]: (state, action) => {
    return state.setIn(['searchOptions', 'aspect'], action.payload);
  },
  [SEARCH_OPTION_BEDS_CHANGE_ACTION]: (state, action) => {
    return state.setIn(['searchOptions', 'beds'], action.payload);
  },
  [SEARCH_OPTION_BATHS_CHANGE_ACTION]: (state, action) => {
    return state.setIn(['searchOptions', 'baths'], action.payload);
  },
  [SEARCH_OPTION_CARS_CHANGE_ACTION]: (state, action) => {
    return state.setIn(['searchOptions', 'cars'], action.payload);
  },
  [SET_CURRENT_PLAN]: (state, action) => {
    // console.log('---------------Reducer Current Plan-------------');
    const filtered = state.get('unitsData').toJS();
    const f_plans = state.get('plansData').toJS();
    const curPlanIndex = action.payload;

    const floorList = filtered.filter( (unit)=> (
      unit.aspect === f_plans[curPlanIndex].aspect && unit.internal_in_meters === f_plans[curPlanIndex].size 
    )).map((unit)=>(unit.floor));
    console.log('Floor List');
    console.log(floorList);

    const curFloorIndex = 0;

    const selectedUnit = filtered.filter( unit => {
      const curPlan = f_plans[curPlanIndex];
      const curFloor = floorList[curFloorIndex];
      return unit.aspect === curPlan.aspect && unit.internal_in_meters === curPlan.size
      && unit.floor === curFloor;
    })[0];

    console.log('Selected Unit');
    console.log(selectedUnit);

    return state.set('curPlan', action.payload)
          .set('floorsData', fromJS(floorList))
          .set('curFloor', curFloorIndex)
          .set('selectedUnit', fromJS(selectedUnit));
  },
  [SET_FLOOR_INDEX]: (state, action) => {

    const filtered = state.get('unitsData').toJS();
    const f_plans = state.get('plansData').toJS();
    const curPlanIndex = state.get('curPlan');
    const floorList = state.get('floorsData').toJS();
    const curFloorIndex = action.payload;

    const selectedUnit = filtered.filter( unit => {
      const curPlan = f_plans[curPlanIndex];
      const curFloor = floorList[curFloorIndex];
      return unit.aspect === curPlan.aspect && unit.internal_in_meters === curPlan.size
      && unit.floor === curFloor;
    })[0];

    console.log('Selected Unit');
    console.log(selectedUnit);

    return state.set('curFloor', curFloorIndex).set('selectedUnit', fromJS(selectedUnit));
  },

  ...pender({
    type: GET_UNIT_DATA,
    onPending: (state, action) => {
      return state.set('unitsData', List([]));
    },
    onSuccess: (state, action) => {
      const { data: units } = action.payload;
      // console.log('---------onSuccess----------');
      // console.log(units);
      if (units.length === 0)
        return state.set('unitsData', List([]))
        .set('plansData', List([]) )
        .set('curPlan', -1)
        .set('floorsData', List([]))
        .set('curFloor', -1)
        .set('selectedUnit', Map({}));  

      const f_plans = units.map(unit => {
        return {aspect : unit.aspect, size: unit.internal_in_meters, img: unit.planimg}
      }).sort((a,b) => (a.size - b.size)).filter((plan, index, self) => index === 
                self.findIndex((t) => (t.aspect === plan.aspect && t.size === plan.size ))
                );
                
      console.log(f_plans);

      const curPlanIndex = 0;

      const floorList = units.filter( (unit)=> (
        unit.aspect === f_plans[curPlanIndex].aspect && unit.internal_in_meters === f_plans[curPlanIndex].size 
      )).map((unit)=>(unit.floor));
      console.log('Floor List');
      console.log(floorList);

      const curFloorIndex = 0;

      const selectedUnit = units.filter( unit => {
        const curPlan = f_plans[curPlanIndex];
        const curFloor = floorList[curFloorIndex];
        return unit.aspect === curPlan.aspect && unit.internal_in_meters === curPlan.size
        && unit.floor === curFloor;
      })[0];
  
      console.log('Selected Unit');
      console.log(selectedUnit);
      return state.set('unitsData', fromJS(units)).set('plansData', fromJS(f_plans))
        .set('curPlan', curPlanIndex)
        .set('floorsData', fromJS(floorList))
        .set('curFloor', curFloorIndex)
        .set('selectedUnit', fromJS(selectedUnit));      
    },
    onError: (state, action) => {

    }
  })
}, initialState);
