import { takeEvery, call, put } from 'redux-saga/effects';
import { getSeancesByMovieId } from '../../webAPI';
import { actionTypes } from '../constants/action-types';

export default function* getSeancesWatcher() {
  yield takeEvery(actionTypes.SEANCES_REQUESTED, getSeancesWorker);
}

function* getSeancesWorker(action) {
  try {
    const payload = yield call(getSeancesByMovieId, action.payload);
    yield put({ type: actionTypes.SEANCES_LOADED, payload });
  } catch (e) {
    yield put({ type: actionTypes.SEANCES_FAILED, payload: e });
  }
}
