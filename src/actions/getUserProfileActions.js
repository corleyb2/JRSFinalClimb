import axios from "axios";
// import Storage from "aws-amplify";
// import { v4 as uuid } from "uuid";

export const GET_USER_PROFILE_REQUEST = "GET_USER_PROFILE_REQUEST";
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_ERROR = "GET_USER_PROFILE_ERROR";

const getUserProfileRequest = (profile) => {
  return {
    type: GET_USER_PROFILE_REQUEST,
  };
};

const getUserProfileSuccess = (profileResponse, avatarResponse) => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    profile: profileResponse,
    avatar: avatarResponse,
  };
};

const getUserProfileError = () => {
  return {
    type: GET_USER_PROFILE_ERROR,
  };
};

const attemptGetUserProfile = async (dispatch) => {
  dispatch(getUserProfileRequest());
  try {
    //establish username here - using auth?  temporary hard code.
    const username = "test1";
    const avatarResponse = null;
    const dbResponse = await axios({
      method: "GET",
      url: `http://localhost:4000/user`,
      data: {
        username: username,
      },
      header: {
        "Content-Type": "application/json",
      },
    }).then((dbResponse) => {
      const profileResponse = dbResponse.data;
      console.log("finding profile", profileResponse);
      dispatch(getUserProfileSuccess(profileResponse, avatarResponse));
      // navigate("/user");
    });
    // if (response.data[0][0] == undefined) {
    //   let response = undefined;
    //   let avatar = undefined;
    //   dispatch(getUserProfileSuccess(response, avatar));
    // } else {
    //   console.log(response.data[0][0]);
    //   const uuid = response.data[0][0].avatar;
    //   const avatar = await Storage.get("profilepics/" + uuid, {
    //     // level: "protected",
    //     contentType: "image/png",
    //   });
    //   const profileResp = response.data[0][0];
  } catch (error) {
    dispatch(getUserProfileError());
    console.error("Error finding profile", error);
  }
};

export const getUserProfileInjector = (dispatch) => {
  return (profile) => attemptGetUserProfile(dispatch, profile);
};
