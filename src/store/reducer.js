import { combineReducers } from 'redux-immutable';
import { recommendReducer } from '../application/Recommend/store';

export default combineReducers({
  recommend: recommendReducer,
});
