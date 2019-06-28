import { actionTypes } from '../constants/action-types';

const initialState = {
  order: {
    features: [],
  },
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ORDER_FEATURE:
      return { ...state, order: { features: action.payload } };

    default:
      return state;
  }
}
