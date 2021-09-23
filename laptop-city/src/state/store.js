import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { modalReducer } from './reducers/modalReducer';

const reducers = combineReducers({
  modal: modalReducer,
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

export { store };
