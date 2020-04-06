import { combineReducers } from 'redux';

const bootstrap = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BOOTSTRAP_DATA':
      return { ...state, ...action.data }
    default:
      return state
  }
}
const rootReducer = combineReducers({
  bootstrap: bootstrap
});

export default rootReducer

