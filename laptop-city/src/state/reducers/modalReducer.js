const initialState = {
  openModal: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        openModal: action.payload,
      };
    case 'close':
      return {
        ...state,
        openModal: null,
      };
    default:
      return state;
  }
};

export { modalReducer };
