export const initialState = {
  user: null,
  complexesList: [],
  complexChosen: null,
  apartmentChosen: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_COMPLEXES':
      return {
        ...state,
        complexesList: action.complexes,
      };
    case 'SET_COMPLEX_CHOSEN':
      return {
        ...state,
        complexChosen: action.complex,
      };
    case 'SET_APARTMENT_CHOSEN':
      return {
        ...state,
        apartmentChosen: action.apartment,
      };

    default:
      return state;
  }
};

export default reducer;
