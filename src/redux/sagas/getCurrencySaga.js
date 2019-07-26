import { takeEvery, call, put } from 'redux-saga/effects';
import { getCurrency } from '../../webAPI';
import { actionTypes } from '../constants/action-types';

export default function* getCurrencyWatcher() {
  yield takeEvery(actionTypes.CURRENCY_REQUESTED, getCurrencyWorker);
}

function* getCurrencyWorker() {
  try {
    const payload = yield call(getCurrency);
    yield put({ type: actionTypes.CURRENCY_LOADED, payload });
  } catch (e) {
    yield put({ type: actionTypes.CURRENCY_FAILED, payload: e });
  }
}
