import axios from "axios";
import { navigate } from "@reach/router";

export const CREATE_USER_PROFILE_REQUEST = "CREATE_USER_PROFILE_REQUEST";
export const CREATE_USER_PROFILE_SUCCESS = "CREATE_USER_PROFILE_SUCCESS";
export const CREATE_USER_PROFILE_ERROR = "CREATE_USER_PROFILE_ERROR";

const createUserProfileRequest = (profile) => {
  return {
    type: CREATE_USER_PROFILE_REQUEST,
    profile: profile,
  };
};

const createUserProfileSuccess = () => {
  return {
    type: CREATE_USER_PROFILE_SUCCESS,
  };
};

const createUserProfileError = () => {
  return {
    type: CREATE_USER_PROFILE_ERROR,
  };
};

const attemptCreateUserProfile = async (dispatch, profile) => {
  dispatch(createUserProfileRequest(profile));
  try {
    let profileToCreate = {
      username: profile.username,
      password: profile.password,
      firstname: profile.firstname,
      lastname: profile.lastname,
      skillLevel: {
        high: profile.skillLevel.high,
        low: profile.skillLevel.low,
      },
      // avatar: imageResponse === "" ? "" : imageResponse.key.split("/")[1],
    };
    console.log("ProfileToCreate", profileToCreate);
    await axios({
      method: "POST",
      url: "http://localhost:4000/user",
      data: profileToCreate,
      header: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("response", response);
      dispatch(createUserProfileSuccess());
      navigate("/user");
    });
  } catch (error) {
    dispatch(createUserProfileError());
    console.error("Error creating profile", error);
  }
};

export const createProfileInjector = (dispatch) => {
  return (profile) => attemptCreateUserProfile(dispatch, profile);
};
