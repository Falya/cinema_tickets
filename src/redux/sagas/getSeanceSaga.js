import { takeEvery, call, put } from 'redux-saga/effects';
import { getSeance } from '../../webAPI';
import { actionTypes } from '../constants/action-types';

export default function* getSeanceWatcher() {
  yield takeEvery(actionTypes.SEANCE_REQUESTED, getSeanceWorker);
}

function* getSeanceWorker(action) {
  try {
    const payload = yield call(getSeance, action.payload);
    yield put({ type: actionTypes.SEANCE_LOADED, payload });
  } catch (e) {
    yield put({ type: actionTypes.SEANCE_FAILED, payload: e });
  }
}
