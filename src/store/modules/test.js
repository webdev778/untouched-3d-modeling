import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

// action types
const TEST_ACTION = 'test/TEST_ACTION';

// action creator
export const doTestAction = createAction(TEST_ACTION); // test redux

// initial state
const initialState = Map({
  max_price: 0
});

// reducer
export default handleActions({
  [TEST_ACTION]: (state, action) => {
    return state.set('max_price', action.payload);
    // return state.setIn(['test', 'mode'], action.payload);
  }
}, initialState);