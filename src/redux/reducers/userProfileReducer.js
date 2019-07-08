import { actionTypes } from '../constants/action-types';

const initialState = {
  userProfile: null,
};

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_PROFILE_LOADED:
      return { ...state, userProfile: action.payload };

    default:
      return state;
  }
}
