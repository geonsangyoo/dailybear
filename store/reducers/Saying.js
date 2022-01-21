import * as sayingActions from '../actions/Saying';

const initialState = {
  mode: '',
  saying: '',
};

const sayingReducer = (state = initialState, action) => {
  switch (action.type) {
    case sayingActions.LOAD_SAYING:
      if (action.saying || action.mode) {
        return {
          ...state,
          saying: action.saying,
          mode: action.mode,
        };
      } else {
        console.log('No row fetched!');
        return initialState;
      }
    case sayingActions.SAVE_SAYING:
      if (action.saying || action.mode) {
        return {
          ...state,
          mode: action.mode,
          saying: action.saying,
        };
      } else {
        console.log('No row updated!');
        return initialState;
      }
    default:
      return state;
  }
};

export default sayingReducer;
