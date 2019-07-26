import { actionTypes } from '../constants/action-types';

const initialState = {
  order: {
    features: [],
    totalPrice: 0,
  },
  payedOrder: {
    tickets: [],
    features: {},
  },
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ORDER_FEATURE:
      return { ...state, order: { ...state.order, features: action.payload } };

    case actionTypes.SET_TOTAL_PRICE:
      return { ...state, order: { ...state.order, totalPrice: action.payload } };

    case actionTypes.SET_PAYED_ORDER:
      return { ...state, payedOrder: action.payload };

    default:
      return state;
  }
}
