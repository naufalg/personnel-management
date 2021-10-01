import { getUsersApi } from 'api/user.api';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  NEXT_PAGE,
  PREV_PAGE,
  SEARCH_USER,
  SEARCH_USER_CLEAR,
} from 'redux/types/user.type';

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const res = await getUsersApi();
    console.log(res);
    const { results } = await res.data;

    dispatch({ type: GET_USER_SUCCESS, payload: results });
  } catch (error) {
    dispatch({ type: GET_USER_ERROR, error: error });
  }
};

export const nextPageAction = () => (dispatch) => {
  dispatch({ type: NEXT_PAGE });
};

export const prevPageAction = () => (dispatch) => {
  dispatch({ type: PREV_PAGE });
};

export const searchUser = (input) => (dispatch) => {
  dispatch({ type: SEARCH_USER, input });
};

export const searchUserClear = () => (dispatch) => {
  dispatch({ type: SEARCH_USER_CLEAR });
};
