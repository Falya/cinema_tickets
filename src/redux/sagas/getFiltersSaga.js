import { takeEvery, call, put } from 'redux-saga/effects';
import { getFilters } from '../../webAPI';
import { actionTypes } from '../constants/action-types';

export default function* getFiltersWatcher() {
  yield takeEvery(actionTypes.FILTERS_REQUESTED, getFiltersWorker);
}

function* getFiltersWorker(action) {
  try {
    const payload = yield call(getFilters, action.payload);
    yield put({ type: actionTypes.FILTERS_LOADED, payload });
  } catch (e) {
    yield put({ type: actionTypes.FILTERS_FAILED, payload: e });
  }
}
