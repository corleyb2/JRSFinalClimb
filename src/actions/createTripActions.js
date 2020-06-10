import axios from "axios";
import { navigate } from "@reach/router";

export const CREATE_TRIP_REQUEST = "CREATE_TRIP_REQUEST";
export const CREATE_TRIP_SUCCESS = "CREATE_TRIP_SUCCESS";
export const CREATE_TRIP_ERROR = "CREATE_TRIP_ERROR";

const createTripRequest = (trip) => {
  return {
    type: CREATE_TRIP_REQUEST,
    trip: trip,
  };
};

const createTripSuccess = () => {
  return {
    type: CREATE_TRIP_SUCCESS,
  };
};

const createTripError = () => {
  return {
    type: CREATE_TRIP_ERROR,
  };
};

const attemptCreateTrip = async (dispatch, trip) => {
  dispatch(createTripRequest(trip));
  try {
    let tripToCreate = {
      location: trip.location,
      dateRange: {
        start: trip.dateRange.start,
        end: trip.dateRange.end,
      },
      attendees: trip.attendees,
    };
    console.log("TripToCreate", tripToCreate);
    await axios({
      method: "POST",
      url: "http://localhost:4000/trip",
      data: tripToCreate,
      header: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("response", response);
      dispatch(createTripSuccess());
      //   navigate("/");
    });
  } catch (error) {
    dispatch(createTripError());
    console.error("Error creating trip", error);
  }
};

export const createTripInjector = (dispatch) => {
  return (trip) => attemptCreateTrip(dispatch, trip);
};
