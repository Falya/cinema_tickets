import { takeEvery, call, put } from 'redux-saga/effects';
import { getMovies } from '../../webAPI';
import { actionTypes } from '../constants/action-types';

export default function* getMoviesWatcher() {
  yield takeEvery(actionTypes.MOVIES_REQUESTED, getMoviesWorker);
}

function* getMoviesWorker() {
  try {
    const payload = yield call(getMovies);
    yield put({ type: actionTypes.MOVIES_LOADED, payload });
  } catch (e) {
    yield put({ type: actionTypes.API_ERRORED, payload: e });
  }
}
