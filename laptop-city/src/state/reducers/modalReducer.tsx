const initialState = {
  openModal: null,
};

export interface IAction {
  type: string;
  payload?: any;
}

const modalReducer = (state = initialState, action: IAction) => {
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
