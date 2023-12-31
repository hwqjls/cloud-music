import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from "./constants";
import { fromJS } from 'immutable';

const defaultState = fromJS({
  currentAlbum: {},
  enterLoading: false,
})

const albumReducer = (state=defaultState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_ALBUM:
      return state.set('currentAlbum', action.data);
    case CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    default:
      return state;
  }
}

export default albumReducer;