import {
  CREATE_USER_PROFILE_REQUEST,
  CREATE_USER_PROFILE_SUCCESS,
  CREATE_USER_PROFILE_ERROR,
} from "../actions/createUserProfileActions";

const initialState = {
  username: null,
  firstname: null,
  lastname: null,
  skillLevel: {
    high: null,
    low: null,
  },
  avatar: null,
  status: null,
};

export const createUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        username: action.username,
        firstname: action.firstname,
        lastname: action.lastname,
        skillLevel: {
          high: action.high,
          low: action.low,
        },
        avatar: action.file,
        status: action.type,
      };
    case CREATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        username: null,
        firstname: null,
        lastname: null,
        skillLevel: {
          high: null,
          low: null,
        },
        avatar: null,
        status: action.type,
      };
    case CREATE_USER_PROFILE_ERROR:
      return {
        ...state,
        username: null,
        firstname: null,
        lastname: null,
        skillLevel: {
          high: null,
          low: null,
        },
        avatar: null,
        status: action.type,
      };
    default:
      return { ...state };
  }
};
