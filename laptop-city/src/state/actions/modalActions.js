const openModalAction = modal => {
  return dispatch => {
    dispatch({
      type: 'open',
      payload: modal,
    });
  };
};

const closeModalAction = () => {
  return dispatch => {
    dispatch({
      type: 'close',
    });
  };
};

export { openModalAction, closeModalAction };
