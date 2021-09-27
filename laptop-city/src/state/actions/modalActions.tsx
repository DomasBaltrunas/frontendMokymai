import { Dispatch } from 'redux';
import { IAction } from '../reducers/modalReducer';

const openModalAction = (modal: string) => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: 'open',
      payload: modal,
    });
  };
};

const closeModalAction = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: 'close',
    });
  };
};

export { openModalAction, closeModalAction };
