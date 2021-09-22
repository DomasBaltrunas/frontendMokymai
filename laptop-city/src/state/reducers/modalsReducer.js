const initialState = {
  addArticle: {
    isOpen: false,
  },
  removeArticle: {
    isOpen: false,
  },
  setFeaturedArticles: {
    isOpen: false,
  },
};

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isOpen: true,
        },
      };
    case 'close':
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isOpen: false,
        },
      };
    case 'closeAll':
      return {
        ...state,
        addArticle: {
          ...state.addArticle,
          isOpen: false,
        },
        removeArticle: {
          ...state.removeArticle,
          isOpen: false,
        },
        setFeaturedArticles: {
          ...state.setFeaturedArticles,
          isOpen: false,
        },
      };
    default:
      return state;
  }
};

export { modalsReducer };
