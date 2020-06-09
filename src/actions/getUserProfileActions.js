import axios from "axios";

export const GET_USER_PROFILE_REQUEST = "GET_USER_PROFILE_REQUEST";
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_ERROR = "GET_USER_PROFILE_ERROR";

const getUserProfileRequest = () => {
  return {
    type: GET_USER_PROFILE_REQUEST,
  };
};

const getUserProfileSuccess = (profile) => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    profile: profile,
  };
};

const getUserProfileError = () => {
  return {
    type: GET_USER_PROFILE_ERROR,
  };
};

const attemptGetUserProfile = async (dispatch, profile) => {
  dispatch(getUserProfileRequest(profile));
  try {
    //get username to here
    await axios({
      method: "GET",
      url: `http://localhost:4000/user?_username=${username}`,
    }).then((response) => {
      console.log("response", response);
      dispatch(getUserProfileSuccess(profile));
    });
  } catch (error) {
    dispatch(getUserProfileError());
    console.error("Error creating profile", error);
  }
};

export const getProfileInjector = (dispatch) => {
  return (profile) => attemptGetUserProfile(dispatch, profile);
};
