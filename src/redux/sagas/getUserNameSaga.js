import { takeEvery, call, put } from 'redux-saga/effects';
import { actionTypes } from '../constants/action-types';
import { getUserName } from '../../webAPI';

export default function* getUserNameWatcher() {
  yield takeEvery(actionTypes.USER_NAME_REQUESTED, getUserNameWorker);
}

function* getUserNameWorker() {
  try {
    const payload = yield call(getUserName);
    yield put({ type: actionTypes.USER_NAME_LOADED, payload });
  } catch (e) {
    yield put({ type: actionTypes.USER_NAME_FAILED, payload: e });
  }
}
