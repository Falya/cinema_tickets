import { takeEvery, call, put } from 'redux-saga/effects';
import { actionTypes } from '../constants/action-types';
import { getUserProfile } from '../../webAPI';

export default function* getUserProfileWatcher() {
  yield takeEvery(actionTypes.USER_PROFILE_REQUESTED, getUserProfileWorker);
}

function* getUserProfileWorker() {
  try {
    const payload = yield call(getUserProfile);
    yield put({ type: actionTypes.USER_PROFILE_LOADED, payload });
  } catch (e) {
    yield put({ type: actionTypes.USER_PROFILE_FAILED, payload: e });
  }
}
