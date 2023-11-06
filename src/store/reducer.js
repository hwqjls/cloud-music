import { combineReducers } from 'redux-immutable';
import { recommendReducer } from '../application/Recommend/store';
import { singersReducer } from '../application/Singers/store';


export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer
});
