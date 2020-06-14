import { combineReducers } from "redux";

import { createUserProfileReducer } from "./createUserProfileReducer";
import { createTripReducer } from "./createTripReducer";
import { getUserProfileReducer } from "./getUserProfileReducer";

const totalReducer = combineReducers({
  createUserProfileReducer,
  createTripReducer,
  getUserProfileReducer,
});

export const rootReducer = (state, action) => {
  // if (action.type === "LOGOUT") {
  //     state = undefined;
  //   }
  return totalReducer(state, action);
};
