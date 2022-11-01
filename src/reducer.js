export const initialState = {
  user: null,
  fullUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_FULL_USER':
      return {
        ...state,
        fullUser: action.fullUser,
      };

    default:
      return state;
  }
};

export default reducer;
