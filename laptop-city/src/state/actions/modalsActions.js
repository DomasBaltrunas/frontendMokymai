const openModalAction = modal => {
  return dispatch => {
    dispatch({
      type: 'open',
      payload: modal,
    });
  };
};

const closeModalAction = modal => {
  return dispatch => {
    dispatch({
      type: 'close',
      payload: modal,
    });
  };
};

const closeAllModalsAction = () => {
  return dispatch => {
    dispatch({
      type: 'closeAll',
    });
  };
};

export { openModalAction, closeModalAction, closeAllModalsAction };
