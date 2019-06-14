import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';
import getFiltersWatcher from './getFiltersSaga';
import getMovieWatcher from './getMovieSaga';
import getMoviesWatcher from './getMoviesSaga';
import getSeancesWatcher from './getSeancesSaga';

export default function*() {
  yield all([getFiltersWatcher(), getMovieWatcher(), getMoviesWatcher(), getSeancesWatcher()]);
}
