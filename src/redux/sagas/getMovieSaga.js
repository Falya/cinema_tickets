import { takeEvery, call, put } from 'redux-saga/effects';
import { getMovieById } from '../../webAPI';
import { actionTypes } from '../constants/action-types';

export default function* getMovieWatcher() {
  yield takeEvery(actionTypes.MOVIE_REQUESTED, getMovieWorker);
}

function* getMovieWorker(action) {
  try {
    const payload = yield call(getMovieById, action.payload);
    yield put({ type: actionTypes.MOVIE_LOADED, payload });
  } catch (e) {
    yield put({ type: actionTypes.MOVIE_FAILED, payload: e });
  }
}
