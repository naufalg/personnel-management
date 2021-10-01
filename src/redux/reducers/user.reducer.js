import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  NEXT_PAGE,
  PREV_PAGE,
  SEARCH_USER,
  SEARCH_USER_CLEAR,
} from '../types/user.type';

const initialState = {
  isLoading: false,
  activePage: 1,
  users: null,
  shownData: null,
  userById: null,
  usersError: null,
  userbyIdError: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        shownData: action.payload.slice(0, 4),
      };
    case GET_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        usersError: action.error,
      };
    case NEXT_PAGE:
      return {
        ...state,
        activePage: (state.activePage += 1),
        shownData: state.users.slice(
          state.activePage * 4 - 4,
          state.activePage * 4
        ),
      };
    case PREV_PAGE:
      return {
        ...state,
        activePage: (state.activePage -= 1),
        shownData: state.users.slice(
          state.activePage * 4 - 4,
          state.activePage * 4
        ),
      };
    case SEARCH_USER:
      const regex = new RegExp(`${action.input}`);
      return {
        ...state,
        shownData: state.users.filter(
          (item) => item.name.first.match(regex) || item.name.last.match(regex)
        ),
      };
    case SEARCH_USER_CLEAR:
      return {
        ...state,
        shownData: state.users.slice(
          state.activePage * 4 - 4,
          state.activePage * 4
        ),
      };

    default:
      return state;
  }
}
