import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { modalReducer } from './reducers/modalReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export { store };
export type RootState = ReturnType<typeof rootReducer>;
