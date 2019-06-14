import { combineReducers } from 'redux';
import blurReducer from './blurReducer';
import filterParamsReducer from './filterParamsReducer';
import filtersReducer from './filtersReducer';
import loadingStateReducer from './loadingStateReducer';
import movieReducer from './movieReducer';
import moviesReducer from './moviesReducer';
import seancesReducer from './seancesReducer';

export default combineReducers({
  blurReducer,
  filterParamsReducer,
  filtersReducer,
  loadingStateReducer,
  movieReducer,
  moviesReducer,
  seancesReducer
});
