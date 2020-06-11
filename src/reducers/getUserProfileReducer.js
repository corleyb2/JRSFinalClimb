import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
} from "../actions/getUserProfileActions";

const initialState = {
  profile: {},
  avatar: null,
  status: null,
};

export const getUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        status: action.status,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        avatar: action.avatar,
        status: action.status,
      };
    case GET_USER_PROFILE_ERROR:
      return {
        ...state,
        status: action.status,
      };
    default:
      return { ...state };
  }
};
