import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { modalsReducer } from './reducers/modalsReducer';

const reducers = combineReducers({
  modals: modalsReducer,
});

const store = createStore(reducers, {}, applyMiddleware(thunk));

export { store };
