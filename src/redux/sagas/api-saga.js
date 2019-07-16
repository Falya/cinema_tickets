import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';
import getFiltersWatcher from './getFiltersSaga';
import getMovieWatcher from './getMovieSaga';
import getMoviesWatcher from './getMoviesSaga';
import getSeancesWatcher from './getSeancesSaga';
import getSeanceWatcher from './getSeanceSaga';
import getUserNameWatcher from './getUserNameSaga';
import getUserProfileWatcher from './getUserProfileSaga';
import getCurrencyWatcher from './getCurrencySaga';

export default function*() {
  yield all([
    getFiltersWatcher(),
    getMovieWatcher(),
    getMoviesWatcher(),
    getSeancesWatcher(),
    getSeanceWatcher(),
    getUserNameWatcher(),
    getUserProfileWatcher(),
    getCurrencyWatcher(),
  ]);
}
