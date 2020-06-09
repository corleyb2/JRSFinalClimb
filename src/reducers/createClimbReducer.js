import {
  CREATE_CLIMB_REQUEST,
  CREATE_CLIMB_SUCCESS,
  CREATE_CLIMB_ERROR,
} from "../actions/createClimbActions";

const initialState = {
  name: null,
  location: {
    town: null,
    state: null,
    zip: null,
  },
  description: null,
  // photos: [null],
  status: null,
};

export const createClimbReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLIMB_REQUEST:
      return {
        ...state,
        name: action.name,
        location: {
          town: action.town,
          state: action.state,
          zip: action.zip,
        },
        description: action.description,
        // photos: [null],
        status: action.type,
      };
    case CREATE_CLIMB_SUCCESS:
      return {
        ...state,
        status: action.type,
      };
    case CREATE_CLIMB_ERROR:
      return {
        ...state,
        status: action.type,
      };
    default:
      return { ...state };
  }
};
