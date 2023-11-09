import { combineReducers } from 'redux-immutable';
import { recommendReducer } from '../application/Recommend/store';
import { singersReducer } from '../application/Singers/store';
import { rankReducer } from '../application/Rank/store';
import { albumReducer } from '../application/Album/store';


export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer
});
