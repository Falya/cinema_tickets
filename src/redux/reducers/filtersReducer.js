import { actionTypes } from '../constants/action-types';

const initialState = {
  filterOptions: null
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FILTERS_LOADED:
      return { ...state, filterOptions: action.payload };

    default:
      return state;
  }
}
