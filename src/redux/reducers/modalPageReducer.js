import { actionTypes } from '../constants/action-types';

const initialState = {
  modalPageHeight: 0,
};

export default function modalPageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MODAL_HEIGHT:
      return { ...state, modalPageHeight: action.payload };

    default:
      return state;
  }
}
