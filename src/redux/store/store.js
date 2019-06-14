import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import apiSaga from '../sagas/api-saga';
import middlewares from '../middlewares/middlewares';

const initialiseSagaMiddleware = createSagaMiddleware();
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, enhancer(applyMiddleware(initialiseSagaMiddleware, ...middlewares)));

initialiseSagaMiddleware.run(apiSaga);
export default store;
