import axios from "axios";
import { navigate } from "@reach/router";

export const CREATE_CLIMB_REQUEST = "CREATE_CLIMB_REQUEST";
export const CREATE_CLIMB_SUCCESS = "CREATE_CLIMB_SUCCESS";
export const CREATE_CLIMB_ERROR = "CREATE_CLIMB_ERROR";

const createClimbRequest = (climb) => {
  return {
    type: CREATE_CLIMB_REQUEST,
    climb: climb,
  };
};

const createClimbSuccess = () => {
  return {
    type: CREATE_CLIMB_SUCCESS,
  };
};

const createClimbError = () => {
  return {
    type: CREATE_CLIMB_ERROR,
  };
};

const attemptCreateClimb = async (dispatch, climb) => {
  dispatch(createClimbRequest(climb));
  try {
    let climbToCreate = {
      name: climb.name,
      location: {
        town: climb.location.town,
        state: climb.location.state,
        zip: climb.location.zip,
      },
      description: climb.description,
      // photos: imageResponse === "" ? "" : imageResponse.key.split("/")[1],
    };
    console.log("ClimbToCreate", climbToCreate);
    await axios({
      method: "POST",
      url: "http://localhost:4000/climb",
      data: climbToCreate,
      header: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("climb creation response", response);
      dispatch(createClimbSuccess());
      navigate("/climb_list");
    });
  } catch (error) {
    dispatch(createClimbError());
    console.error("Error creating climbspot", error);
  }
};

export const createClimbInjector = (dispatch) => {
  return (climb) => attemptCreateClimb(dispatch, climb);
};
