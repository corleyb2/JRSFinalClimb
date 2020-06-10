import {
  CREATE_TRIP_REQUEST,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_ERROR,
} from "../actions/createTripActions";

const initialState = {
  location: null,
  dateRange: {
    start: null,
    end: null,
  },
  attendees: [],
  status: null,
};

export const createTripReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRIP_REQUEST:
      return {
        ...state,
        location: action.location,
        dateRange: {
          start: action.start,
          end: action.end,
        },
        attendees: [action.attendees],
        status: action.status,
      };
    case CREATE_TRIP_SUCCESS:
      return {
        ...state,
        status: action.status,
      };
    case CREATE_TRIP_ERROR:
      return {
        ...state,
        location: null,
        dateRange: {
          start: null,
          end: null,
        },
        attendees: [],
        status: action.status,
      };
    default:
      return { ...state };
  }
};
